import { fetchFromAPI } from "@/app/apiFetch";

export type StationNames = {
    crs: string, name: string, id?: string
}[];

export type StationNamesResponse = {
    stations: { crs: string, name: string, id?: string }[];
}

export type StationDetailsResponse = {
    location: {addressLines: string, postCode: string},
    facilities: {fares?: {ticketOffice?: {openingTimes?: string}}}
}

export type StationDetails = {
    address: string,
    ticketOfficeInfo: string
};

export type StationDeparturesResponse = {
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

export type Departure = {
    rid: string,
    std: string,
    etd?: string,
    status: string,
    destination: string,
    platform?: string
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

export async function getStationDetails(stationCrs: string): Promise<StationDetails> {
    const data = await fetchFromAPI<StationDetailsResponse>(`stationDetails/${stationCrs}`);
    const address = data.location.addressLines.replaceAll("<br>", ", ") + ", " + data.location.postCode;
    const ticketOfficeOpeningTimes : string | undefined = data.facilities.fares?.ticketOffice?.openingTimes;

    const ticketOfficeInfo = ticketOfficeOpeningTimes
        ? "Ticket office opening times: " + ticketOfficeOpeningTimes.replaceAll("<br>", ", ")
        : "Ticket office information is unavailable";

    return {
        address: address,
        ticketOfficeInfo: ticketOfficeInfo,
    };
}

export async function getStationName(stationCrs: string): Promise<string> {
    const data = await fetchFromAPI<StationNamesResponse>("stations");
    const stations = data.stations;
    for (const station of stations) {
        if (station.crs === stationCrs) {
            return station.name;
        }
    }
    throw new Error("Station does not exist.");
}

export async function getJourneys(originCrs: string, destinationCrs: string | undefined = undefined): Promise<Departure[]> {
    const body : {crs: string, filterCrs?: string} = !!destinationCrs ? {"crs": originCrs, "filterCrs": destinationCrs} : { "crs": originCrs};
    const data = await fetchFromAPI<StationDeparturesResponse>("liveTrainsBoard/departures", "POST", body);
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