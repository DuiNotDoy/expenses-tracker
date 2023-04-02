import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import Form from '../../components/Form'

type Props = {
    categories: string[]
}

export default function Home({ categories }: Props) {

    return (
        <div className="">
            <Header />
            <main className='bg-gray-300 text-center h-screen'>
                <h1>Home</h1>
                <Link href={'/spendings'} className='bg-red-300 p-1 rounded-md'>See Spendings</Link>
                <Form categories={categories} />
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

export async function getStaticProps() {
    const res = await fetch('http://localhost:3000/api/db/category')
    const categories = await res.json()

    return {
        props: {
            categories
        }
    }
}
