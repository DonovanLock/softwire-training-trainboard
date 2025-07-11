import { fetchFromAPI } from "@/app/apiFetch";
import { formatCamelCase, getTimeFromDateTimeString } from "@/app/helperFunction";

type StationDeparturesResponse = {
    trainServices: {
        rid: string,
        std: string,
        status: string,
        destination: {
            name: string
        }[],
        platform?: string,
        etd?: string
    }[]
}

type Departure = {
    rid: string,
    std: string,
    etd?: string,
    status: string,
    destination: string,
    platform?: string
}

async function getStationDepartures(originCrs: string, destinationCrs: string): Promise<Departure[]> {
    const data = await fetchFromAPI<StationDeparturesResponse>("liveTrainsBoard/departures", "POST", { "crs": originCrs, "filterCrs": destinationCrs });
    const trainServices = data.trainServices;
    const departures: Departure[] = trainServices.map((trainService) => {
        return {
            rid: trainService.rid,
            std: trainService.std,
            etd: trainService.etd,
            status: trainService.status,
            destination: trainService.destination.slice(-1)[0].name,
            platform: trainService.platform
        };
    })
    return departures;
}


export async function DepartureTable({originCrs, destinationCrs}: {originCrs: string, destinationCrs: string}) {
    const departures = await getStationDepartures(originCrs, destinationCrs);
    
    const TableRow: React.FC<{departure: Departure}> = ({departure}) => {
        const scheduledTime = getTimeFromDateTimeString(departure.std);
        const isOnTime = departure.status === "OnTime";
        const isTimeUpdated = departure.etd && !isOnTime;
        return (
            <tr>
                <td className={"px-3 py-1 text-left"}>
                    {isOnTime ? scheduledTime : <s key="strikethrough">{scheduledTime}</s>}
                    {isTimeUpdated && <b key="bold"> {getTimeFromDateTimeString(departure.etd!)}</b>}
                </td>
                <td className={"px-3 py-1 text-left"}>{departure.destination}</td>
                <td className={"px-3 py-1 text-center"}>
                    {departure.platform ? departure.platform : "No platform yet"}
                </td>
                <td className={"px-3 py-1 text-center"}>{formatCamelCase(departure.status)}</td>
            </tr>
        );
    }

    return (
        <table>
            <tbody>
                <tr key="TitleRow">
                    <th className={"px-3 text-left"}>Departure</th>
                    <th className={"px-3 text-left"}>Destination</th>
                    <th className={"px-3 text-center"}>Platform</th>
                    <th className={"px-3 text-center"}>Status</th>
                </tr>
                {departures.map(departure => 
                    <TableRow departure={departure} key={departure.rid}/>
                )}
            </tbody>
        </table>
    );
}