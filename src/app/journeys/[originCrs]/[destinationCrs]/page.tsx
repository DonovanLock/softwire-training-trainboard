import { getStationName } from "@/app/apiFunctions";
import { JourneyTable } from "../../../components/JourneyTable";

export default async function Page({params}: {params: Promise<{ originCrs: string, destinationCrs: string }>}) {
    const { originCrs, destinationCrs} = await params;
    const [originName, destinationName] = await Promise.all([getStationName(originCrs),getStationName(destinationCrs)]);

    return (
        <>
            <div className="p-3">
                All trains from {originName} ({originCrs}) to {destinationName} ({destinationCrs}).
            </div>
            <div className="p-3">
                <JourneyTable originCrs={originCrs} destinationCrs={destinationCrs}/>
            </div>
        </>
    );
}
