import { getStationName } from "@/app/apiFunctions";
import { JourneyTable } from "../../../components/JourneyTable";

export default async function Page({params}: {params: Promise<{ originCrs: string, destinationCrs: string }>}) {
    const { originCrs: originCrs } = await params;
    const originName = await getStationName(originCrs);
    const { destinationCrs: destinationCrs } = await params;
    const destinationName = await getStationName(destinationCrs);

    return (
        <>
            <div className={"p-3"}>
                All trains from {originName} ({originCrs}) to {destinationName} ({destinationCrs}).
            </div>
            <div className={"p-3"}>
                <JourneyTable originCrs={originCrs} destinationCrs={destinationCrs}/>
            </div>
        </>
    );
}
