import { fetchFromAPI } from "@/app/apiFetch";
import { formatCamelCase, getTimeFromDateTimeString } from "@/app/helperFunction";

type StationNamesResponse = {
    stations: { crs: string, name: string }[]
}
type StationNames = { crs: string, name: string, id: string }[]

// get list of stations, filter only to those with both name and crs defined
// (how to handle names/crs codes being repeated?)


export default function Home() {
    
}
