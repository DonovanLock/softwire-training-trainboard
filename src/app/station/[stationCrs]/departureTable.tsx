import { fetchFromAPI } from "@/app/apiFetch";
import {formatCamelCase, getTimeFromDateTimeString} from "@/app/helperFunction";

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

export async function getDepartureTable(stationCrs: string) {
    const departures = await getStationDepartures(stationCrs);

    const departureRows = [
        <tr key="TitleRow">
            <th className={"px-3 text-left"}>Departure</th>
            <th className={"px-3 text-left"}>Destination</th>
            <th className={"px-3 text-center"}>Platform</th>
            <th className={"px-3 text-center"}>Status</th>
        </tr>
    ];
    for (const departure of departures) {
        const platform = !!departure.platform ? departure.platform : "No platform yet";
        const scheduledTime = getTimeFromDateTimeString(departure.std);
        const isOnTime = departure.status === "OnTime";
        const formattedStatus = formatCamelCase(departure.status);
        const scheduledTimeOutput = isOnTime ? scheduledTime : <s key="strikethrough">{scheduledTime}</s>
        const timeEntry = [scheduledTimeOutput];
        if (!!departure.etd && !isOnTime) {
            timeEntry.push(<b key="bold"> {getTimeFromDateTimeString(departure.etd)}</b>);
        }

        const departureRow =
            <tr key={departure.rid}>
                <td className={"px-3 py-1 text-left"}>{timeEntry}</td>
                <td className={"px-3 py-1 text-left"}>{departure.destinationName}</td>
                <td className={"px-3 py-1 text-center"}>{platform}</td>
                <td className={"px-3 py-1 text-center"}>{formattedStatus}</td>
            </tr>
        departureRows.push(departureRow);
    }
    return (
        <table>
            <tbody>
                {departureRows}
            </tbody>
        </table>
    );
}