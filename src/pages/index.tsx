import Link from "next/link";

export default function Home() {

    return (
        <>
            <h1> Landing Page </h1>
            <Link href={'/home'} className="bg-red-300 p-1 rounded-md">Get started</Link>
        </>
    )
}

