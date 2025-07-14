import { JourneyTable } from "@/app/components/JourneyTable";
import { getStationDetails, getStationName } from "@/app/apiFunctions";

export default async function Page({params}: {params: Promise<{ stationCrs: string }>}) {
    const { stationCrs: stationCrs } = await params;
    const details = await getStationDetails(stationCrs);
    const name = await getStationName(stationCrs);
    return (
        <>
            <div className="p-3">
                Welcome to the details page for {name} ({stationCrs}).
                <div>
                    <div>Address: {details.address}.</div>
                    <div>{details.ticketOfficeInfo}.</div>
                </div>
            </div>
            <div className="p-3">
                <JourneyTable originCrs={stationCrs}/>
            </div>
        </>
    );
}
