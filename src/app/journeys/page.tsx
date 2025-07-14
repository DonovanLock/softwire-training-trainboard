import { getStationNames } from "@/app/apiFunctions";
import FilterableStationList from "@/app/components/FilterableStationList";

export default async function Home() {
    const stationNames = await getStationNames();

    return (
        <>
            <div className = {"p-2"}>
                Select a departure station:
                <div>
                    <FilterableStationList stations={stationNames}/>
                </div>
            </div>
        </>
    );
}
