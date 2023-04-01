import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'

// postgres://postgres:iScreamour_420@db.fooxulujdilkeftgxxlw.supabase.co:6543/postgres

export default function Home() {
    return (
        <div className="">
            <header className="p-2">
                <div className="flex justify-end">
                    <UserButton />
                </div>
            </header>
            <main>
                <h1>Home</h1>
                <Link href={'/spendings'}>See Spendings</Link>
            </main>
        </div>
    )
}
