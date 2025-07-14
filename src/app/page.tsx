import Link from "next/link";
import Image from "next/image";

export default async function Home() {
    return (
        <div>
            <Image
                src="/images/HomePage.png"
                width="10000"
                height="10000"
                alt="Home page"
            />
        </div>
    );
}
