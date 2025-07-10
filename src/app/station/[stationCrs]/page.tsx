import {notFound} from "next/navigation";

async function fetchFromAPI<T=never>(urlSuffix: string, method: string = "GET", body: Record<string, string> = {}, headers: Record<string, string> = {}) {
    if (!process.env.BASE_URL) {
        throw new Error('No base URL provided.')
    } else if (!process.env.API_KEY) {
        throw new Error('No API key provided.')
    }

    const apiUrl = process.env.BASE_URL + urlSuffix;
    console.log(apiUrl);

    const request: RequestInit = {};
    request.headers = headers;
    request.headers["x-api-key"] = process.env.API_KEY;
    if (method === "POST") {
        request.headers["Content-Type"] = "application/json";
        request.body = JSON.stringify(body);
    }
    request.method = method;

    console.log(request)

    const res = await fetch(apiUrl, request);
    console.log(res.status)
    if (res.status === 200) {
        const data: T = await res.json();
        return data;
    } else if (res.status === 404) {
        notFound();
    } else {
        console.log("Unable to fetch from API");
        notFound();
    }
}

type StationDeparturesResponse = {
    trainServices: {rid: string, std: string, status: string, destination: {name: string}[], platform?: string, etd?: string}[]
}
async function getStationDepartures(stationCrs: string) {
    const data = await fetchFromAPI<StationDeparturesResponse>("liveTrainsBoard/departures", "POST", {"crs": stationCrs});
    const trainServices = data.trainServices;
    const departures = [];
    for (const trainService of trainServices) {
        const rid = trainService.rid;
        const std = trainService.std;
        const etd = trainService.hasOwnProperty("etd") ? trainService.etd : undefined;
        const status = trainService.status;
        const destinations = trainService.destination;
        const destinationName = destinations[destinations.length - 1].name;
        const platform = trainService.hasOwnProperty("platform") ? trainService.platform : undefined;
        departures.push({"rid": rid, "std": std, "etd": etd, "status": status, "destinationName": destinationName, "platform": platform });
    }
    return departures;
}

type StationDetailsResponse = {
    location: {addressLines: string, postCode: string},
    facilities: {fares: {ticketOffice: {openingTimes: string}}}
}
async function getStationDetails(stationCrs: string) {
    const data = await fetchFromAPI<StationDetailsResponse>(`stationDetails/${stationCrs}`)
    const address = data.location.addressLines.replaceAll("<br>", ", ") + ", " + data.location.postCode;
    const ticketOfficeOpeningTimes = data.facilities.fares.ticketOffice.openingTimes.replaceAll("<br>", ", ");

    const details = {
        address: address,
        ticketOfficeOpeningTimes: ticketOfficeOpeningTimes,
    };

    return details;
}

type StationNamesResponse = {
    stations: {crs: string, name: string}[]
}
async function getStationName(stationCrs: string) {
    const data = await fetchFromAPI<StationNamesResponse>("stations");
    const stations = data.stations;
    for (const station of stations) {
        if (station.crs === stationCrs) {
            return station.name;
        }
    }
    throw new Error("Station does not exist.");
}

export default async function Page({params}: {params: Promise<{ stationCrs: string }>}) {
    const { stationCrs: stationCrs } = await params;
    const details = await getStationDetails(stationCrs);
    const name = await getStationName(stationCrs);
    const departures = await getStationDepartures(stationCrs);

    const departureRows = [
        <tr key="TitleRow">
            <th className={"p-1"}>Time</th>
            <th className={"p-1"}>Destination</th>
            <th className={"p-1"}>Platform</th>
            <th className={"p-1"}>Status</th>
        </tr>
    ];
    for (const departure of departures) {
        const platform = !!departure.platform ? departure.platform : "No platform yet";
        const scheduledTime = getTimeFromDateTimeString(departure.std);

        //const estimatedTime = getTimeFromDateTimeString(departure.etd);
        const departureRow =
            <tr key={departure.rid}>
                <td className={"p-1"}>{scheduledTime}</td>
                <td className={"p-1"}>{departure.destinationName}</td>
                <td className={"p-1"}>{platform}</td>
                <td className={"p-1"}>{departure.status}</td>
            </tr>
        departureRows.push(departureRow);
    }
    return (
        <>
            <div className={"w-full text-center bg-red-800"}>
                <h1 className={"text-3xl py-3 text-white"}>TrainBoard</h1>
            </div>
            <div className={"p-3"}>
                Welcome to the details page for {name} ({stationCrs}).
                <div>
                    <div>Address: {details.address}.</div>
                    <div>Ticket office opening times: {details.ticketOfficeOpeningTimes}.</div>
                </div>
            </div>
            <div className={"p-3"}>
                <table>
                    {departureRows}
                </table>
            </div>
        </>
    )
}

function getTimeFromDateTimeString(dateTimeString : string) : string {
    const tIndex = dateTimeString.indexOf("T");
    const firstColonIndex = dateTimeString.indexOf(":");
    const secondColonIndex = dateTimeString.indexOf(":", firstColonIndex+1);
    return dateTimeString.slice(tIndex+1, secondColonIndex);
}
