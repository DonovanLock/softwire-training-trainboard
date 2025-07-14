import { fetchFromAPI } from "@/app/apiFetch";
import { DepartureTable } from "./journeyTable";

type StationNamesResponse = {
    stations: {crs: string, name: string}[];
}
async function getStationName(originCrs: string): Promise<string> {
    const data = await fetchFromAPI<StationNamesResponse>("stations");
    const stations = data.stations;
    for (const station of stations) {
        if (station.crs === originCrs) {
            return station.name;
        }
    }
    throw new Error("Station does not exist.");
}

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
                <DepartureTable originCrs={originCrs} destinationCrs={destinationCrs}/>
            </div>
        </>
    );
}
