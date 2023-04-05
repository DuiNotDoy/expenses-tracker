import Link from 'next/link'
import Form from '../../components/Form'
import type { GetServerSideProps } from 'next'
import { getCategories } from './api/db/category'
import { LoadingOverlay, Title } from '@mantine/core'
import { useState } from 'react'

type Props = {
    categories: string[]
}

export default function Home({ categories }: Props) {
    const [loading, setLoading] = useState(false)

    return (
        <>
            <LoadingOverlay visible={loading} />
            <Title order={2} align='center'>Home</Title>
            <Link
                href={'/spendings'}
                className='bg-red-300 p-1 rounded-md'
                onClick={() => setLoading(true)}>See Spendings</Link>
            <Form categories={categories} />
        </>
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
