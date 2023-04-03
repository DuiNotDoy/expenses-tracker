import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import Form from '../../components/Form'

export default function Home() {

    return (
        <div>
            <Header />
            <main className='bg-gray-300 text-center h-screen'>
                <h1>Home</h1>
                <Link href={'/spendings'} className='bg-red-300 p-1 rounded-md'>See Spendings</Link>
                <Form />
            </main>
        </div>
    )
}

function Header() {
    return (
        <header className="p-2">
            <div className="flex justify-end">
                <UserButton />
            </div>
        </header>
    )
}

