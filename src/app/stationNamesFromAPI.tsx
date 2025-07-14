import { fetchFromAPI } from "@/app/apiFetch";
import {StationNames} from "@/app/apiFunctions";

type StationNamesResponse = {
    stations: { crs: string, name: string, id: string }[];
}

export async function getStationNames() : Promise<StationNames> {
    const data = await fetchFromAPI<StationNamesResponse>("stations");
    const stations : StationNames = data.stations;
    const sortedFilteredStations : StationNames = [];
    for (const station of stations) {
        if (!!station.crs) {
            sortedFilteredStations.push({
                "crs": station.crs,
                "name": station.name,
                "id": station.id
            });
        }
    }
    sortedFilteredStations.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    return sortedFilteredStations;
}