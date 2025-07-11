'use client'
import {StationNames} from "@/app/stringParsingFunctions";
import React from "react";

export default function FilterableStationList({stations}: { stations: StationNames }) {
    const [searchString, setSearchString] = React.useState("");
    stations = stations.filter(station =>
        station.name.toLowerCase().includes(searchString.toLowerCase()) ||
        station.crs.toLowerCase().includes(searchString.toLowerCase()));
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
            <table className={"table-fixed"}>
                <tbody>
                <tr key="TitleRow" className={"border-b-2 border-b-red-700"}>
                    <th className={"px-3 text-left w-100"}>Station name</th>
                    <th className={"px-3 text-left"}>Code</th>
                </tr>
                {stations.map((station) => (
                    <tr key={station.id} className={"border-y border-b-red-700"}>
                        <td className={"px-3 py-1 text-left overflow-auto"}>
                            <a href={`/station/${station.crs}`}>
                                {station.name}
                            </a>
                        </td>
                        <td className={"px-3 py-1 text-left"}>
                            <a href={`/station/${station.crs}`}>
                                {station.crs}
                            </a>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

