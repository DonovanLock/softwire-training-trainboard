'use client'
import { useSearchParams } from "next/navigation";

export default async function Page({params}: {params: Promise<{ stationId: string }>}) {
  const { stationId } = await params;
  const stationCodes = [stationId];
  return (
        <>
            <div className={"w-full text-center bg-red-800"}>
                <h1 className={"text-3xl py-3 text-white"}>TrainBoard</h1>
            </div>
            <div>
                I&apos;m a simple train board, short and lacking innovation.
            <div
                className="">
                {stationCodes.map((stationName) => (
                    <div className={"flex flex-row gap-4"} key={stationName}>
                        <div>Station Code:</div>
                        <div>{stationName}</div>
                    </div>
                ))}
            </div>
            </div>
        </>
    );
}

/*export default function Home() {

    const searchParams = useSearchParams();
    const stationId = searchParams.get("stationId");
    const stationCodes: string[] = !!stationId ? [stationId] : []; 

    return (
        <>
            <div className={"w-full text-center bg-red-800"}>
                <h1 className={"text-3xl py-3 text-white"}>TrainBoard</h1>
            </div>
            <div>
                I&apos;m a simple train board, short and lacking innovation.
            <div
                className="">
                {stationCodes.map((stationName) => (
                    <div className={"flex flex-row gap-4"} key={stationName}>
                        <div>Station Code:</div>
                        <div>{stationName}</div>
                    </div>
                ))}
            </div>
            </div>
        </>
    );
}*/
