import type { NextApiRequest, NextApiResponse } from 'next'

async function getStationDetails(stationId : string) {
    if (!process.env.BASE_URL) {
        throw new Error('No base URL provided.')
    } else if (!process.env.API_KEY) {
        throw new Error('No API KEY provided.')
    }

    const APIURL = process.env.BASE_URL + "stationDetails/" + stationId;
    console.log(APIURL);
    const res = await fetch(APIURL, {
        headers: {
            "x-api-key": process.env.API_KEY
        }
    });
    const data = await res.json();
    return data;
}

export default async function Page({params}: {params: Promise<{ stationId: string }>}) {
  const { stationId } = await params;
  const stationData = await getStationDetails(stationId);
  console.log(stationData);
  return (
        <>
            <div className={"w-full text-center bg-red-800"}>
                <h1 className={"text-3xl py-3 text-white"}>TrainBoard</h1>
            </div>
            <div>
                Welcome to the details page for {stationId}
            <div
                className="">
            </div>
            </div>
        </>
    );
}
