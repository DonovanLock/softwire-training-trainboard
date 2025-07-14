import { formatCamelCase, getTimeFromDateTimeString } from "@/app/stringParsingFunctions";
import { Departure, getJourneys } from "../apiFunctions";

export async function JourneyTable({originCrs, destinationCrs}: {originCrs: string, destinationCrs?: string | undefined}) {
    const departures = await getJourneys(originCrs, destinationCrs);
    
    const TableRow: React.FC<{departure: Departure}> = ({departure}) => {
        const scheduledTime = getTimeFromDateTimeString(departure.std);
        const isOnTime = departure.status === "OnTime";
        const isTimeUpdated = departure.etd && !isOnTime;
        return (
            <tr className="border-y border-b-red-700">
                <td className="px-3 py-1 text-left">
                    {isOnTime ? scheduledTime : <s key="strikethrough">{scheduledTime}</s>}
                    {isTimeUpdated && <b key="bold"> {getTimeFromDateTimeString(departure.etd!)}</b>}
                </td>
                <td className="px-3 py-1 text-left">{departure.destination}</td>
                <td className="px-3 py-1 text-center">
                    {departure.platform ? departure.platform : "No platform yet"}
                </td>
                <td className="px-3 py-1 text-center">{formatCamelCase(departure.status)}</td>
            </tr>
        );
    }

    return (
        <table>
            <tbody>
                <tr key="TitleRow" className="border-b-2 border-b-red-700">
                    <th className="px-3 text-left">Departure</th>
                    <th className="px-3 text-left">Destination</th>
                    <th className="px-3 text-center">Platform</th>
                    <th className="px-3 text-center">Status</th>
                </tr>
                {departures.map(departure => 
                    <TableRow departure={departure} key={departure.rid}/>
                )}
            </tbody>
        </table>
    );
}