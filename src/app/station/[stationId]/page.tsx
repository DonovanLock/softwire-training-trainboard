import type { NextApiRequest, NextApiResponse } from 'next'

async function getStationDetails(stationId: string) {
    if (!process.env.BASE_URL) {
        throw new Error('No base URL provided.')
    } else if (!process.env.API_KEY) {
        throw new Error('No API key provided.')
    }

    const apiUrl = process.env.BASE_URL + "stationDetails/" + stationId;
    const res = await fetch(apiUrl, {
        "headers": {
            "x-api-key": process.env.API_KEY
        }
    });
    // TODO: check result is correctly formatted (i.e. station exists, etc.)
    const data = await res.json();
    // TODO: For each element in data, add to details (and thus webpage) iff that element is actually defined
    const address = data.location.addressLines.replaceAll("<br>", ", ") + ", " + data.location.postCode;
    const ticketOfficeOpeningTimes = data.facilities.fares.ticketOffice.openingTimes.replaceAll("<br>", ", ");

    const details = {
        address: address,
        ticketOfficeOpeningTimes: ticketOfficeOpeningTimes,
    };

    return details;
}

async function getStationName(stationId: string) {
    if (!process.env.BASE_URL) {
        throw new Error('No base URL provided.')
    } else if (!process.env.API_KEY) {
        throw new Error('No API key provided.')
    }

    const apiUrl = process.env.BASE_URL + "stations";
    const res = await fetch(apiUrl, {
        "headers": {
            "x-api-key": process.env.API_KEY
        }
    });
    const data = await res.json();
    const stations = data.stations;
    for (const station of stations) {
        if (station.crs === stationId) {
            return station.name;
        }
    }
    throw new Error("Station does not exist.");
}

export default async function Page({params}: {params: Promise<{ stationId: string }>}) {
    const { stationId } = await params;
    const details = await getStationDetails(stationId);
    const name = await getStationName(stationId);
    return (
        <>
            <div className={"w-full text-center bg-red-800"}>
                <h1 className={"text-3xl py-3 text-white"}>TrainBoard</h1>
            </div>
            <div className={"p-3"}>
                Welcome to the details page for {name} ({stationId}).
                <div>
                    <div>Address: {details.address}.</div>
                    <div>Ticket office opening times: {details.ticketOfficeOpeningTimes}.</div>
                </div>
            </div>
        </>
    );
}
