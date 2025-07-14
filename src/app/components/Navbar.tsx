import Link from "next/link";
import Image from "next/image";

export default async function Navbar() {
    return (
        <div className="w-full text-center flex" style={{ backgroundColor: "#ce132e" }}>
            <div className="w-18 p-1 pl-2 pt-2">
                <Link href="/">
                    <Image
                        src="/images/HomeButton.png"
                        width={50}
                        height={50}
                        alt="Home button"
                    />
                </Link>
            </div>
            <div className="w-60 pt-4 text-white">
                <Link href="/journeys">Plan a journey</Link>
            </div>
            <div className="w-30 pt-4 text-white">
                <Link href="/stations">All stations</Link>
            </div>
            <div className="flex flex-col items-center justify-center w-full">
                <h1 className="text-3xl py-3 text-white">TrainBoard</h1>
            </div>
            <div className="w-30 p-1">
                <Link href="https://www.lner.co.uk/">
                    <Image
                        src="/images/LnerLogo.png"
                        width={50}
                        height={50}
                        alt="LNER button"
                    />
                </Link>
            </div>
        </div>
    );
}