import { getStationNames } from "@/app/stationNamesFromAPI";
import FilterableStationList from "@/app/FilterableStationList";

export default async function Home() {
    const stationNames = await getStationNames();

    return (
        <>
            <div className={"w-full text-center bg-red-800"}>
                <h1 className={"text-3xl py-3 text-white"}>All stations</h1>
            </div>
            <div className = {"p-2"}>
                Click on a station to see more information and incoming trains.
                <div className="">
                    <FilterableStationList stations={stationNames}/>
                </div>
            </div>
        </>
    );
}
