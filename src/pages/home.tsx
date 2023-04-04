import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import Form from '../../components/Form'
import type { GetServerSideProps } from 'next'

type Props = {
    categories: string[]
}

export default function Home({ categories }: Props) {

    return (
        <div>
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

export const getServerSideProps: GetServerSideProps = async () => {
    console.log(process.env)
    let link = ''

    if (process.env.NODE_ENV === 'development') {
        link = 'http://localhost:3000'
    } else {
        link = 'https://dui-expenses-tracker.vercel.app/'
    }

    const res = await fetch(`${link}/api/db/category`)
    const categories = await res.json()

    return {
        props: {
            categories
        }
    }
}
