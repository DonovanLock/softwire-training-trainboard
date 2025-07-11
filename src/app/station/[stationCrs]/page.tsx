import { fetchFromAPI } from "@/app/apiFetch";
import {DepartureTable} from "./departureTable";

type StationDetailsResponse = {
    location: {addressLines: string, postCode: string},
    facilities: {fares?: {ticketOffice?: {openingTimes?: string}}}
}

type StationDescription = {
    address: string,
    ticketOfficeInfo: string
};

async function getStationDetails(stationCrs: string): Promise<StationDescription> {
    const data = await fetchFromAPI<StationDetailsResponse>(`stationDetails/${stationCrs}`);
    const address = data.location.addressLines.replaceAll("<br>", ", ") + ", " + data.location.postCode;
    const ticketOfficeOpeningTimes : string | undefined = data.facilities.fares?.ticketOffice?.openingTimes;

    const ticketOfficeInfo = ticketOfficeOpeningTimes
        ? "Ticket office opening times: " + ticketOfficeOpeningTimes.replaceAll("<br>", ", ")
        : "Ticket office information is unavailable";

    return {
        address: address,
        ticketOfficeInfo: ticketOfficeInfo,
    };
}

type StationNamesResponse = {
    stations: {crs: string, name: string}[];
}

async function getStationName(stationCrs: string): Promise<string> {
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
    return (
        <>
            <div className={"w-full text-center bg-red-800"}>
                <h1 className={"text-3xl py-3 text-white"}>TrainBoard</h1>
            </div>
            <div className={"p-3"}>
                Welcome to the details page for {name} ({stationCrs}).
                <div>
                    <div>Address: {details.address}.</div>
                    <div>{details.ticketOfficeInfo}.</div>
                </div>
            </div>
            <div className={"p-3"}>
                <DepartureTable stationCrs={stationCrs}/>
            </div>
        </>
    );
}
