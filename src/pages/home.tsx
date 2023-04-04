import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import Form from '../../components/Form'
import type { GetServerSideProps } from 'next'
import { getCategories } from './api/db/category'

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
    const categories = getCategories()

    return {
        props: {
            categories
        }
    }
}
