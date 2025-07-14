import Link from "next/link";

export default async function Home() {
    return (
        <>
            <div className = {"p-2"}>
                Welcome to your incredibly advanced TrainBoard
                <div><Link href = "/stations">List of stations</Link></div>
                <div><Link href = "/journeys">Plan a journey</Link></div>
            </div>
        </>
    );
}
