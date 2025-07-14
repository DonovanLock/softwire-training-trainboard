import Link from "next/link";
import Image from "next/image";

export default async function Navbar() {
    return (
        <div className="w-full text-center bg-red-800 flex">
            <div className="w-14 p-1 pl-2 pt-2">
                <Link href="/">
                    <Image
                        src="/images/HomeButton.png"
                        width={50}
                        height={50}
                        alt="Home button"
                    />
                </Link>
            </div>
            <div className="flex flex-col items-center justify-center w-full">
                <h1 className="text-3xl py-3 text-white">TrainBoard</h1>
            </div>
        </div>
    );
}