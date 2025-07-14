'use client'
import {StationNames} from "@/app/apiFunctions";
import React from "react";
import { usePathname } from 'next/navigation'
import Link from "next/link";

export default function FilterableStationList({stations}: { stations: StationNames }) {
    const [searchString, setSearchString] = React.useState("");
    stations = stations.filter(station =>
        station.name.toLowerCase().includes(searchString.toLowerCase()) ||
        station.crs.toLowerCase().includes(searchString.toLowerCase()));
    const pathname = usePathname()
    return (
        <div>
            <input
                type="text"
                placeholder="Search Stations"
                onChange={(e) => setSearchString(e.target.value)}
                style={{
                    width: "100%",
                    border: 'none',
                    zIndex: "1",
                }}
            />
            <table className="table-fixed">
                <tbody>
                <tr key="TitleRow" className="border-b-2 border-b-red-700">
                    <th className="px-3 text-left w-100">Station name</th>
                    <th className="px-3 text-left">Code</th>
                </tr>
                {stations.map((station) => (
                    <tr key={station.id} className="border-y border-b-red-700">
                        <td className="px-3 py-1 text-left overflow-auto">
                            <Link href={`${pathname}/${station.crs}`}>
                                {station.name}
                            </Link>
                        </td>
                        <td className="px-3 py-1 text-left">
                            <Link href={`${pathname}/${station.crs}`}>
                                {station.crs}
                            </Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

