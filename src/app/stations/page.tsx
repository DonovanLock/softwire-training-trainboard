import { getStationNames } from "@/app/apiFunctions";
import FilterableStationList from "@/app/components/FilterableStationList";

export default async function Home() {
    const stationNames = await getStationNames();

    return (
        <>
            <div className = {"p-2"}>
                Click on a station to see more information and incoming trains.
                <div>
                    <FilterableStationList stations={stationNames}/>
                </div>
            </div>
        </>
    );
}
