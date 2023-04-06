import Link from 'next/link'
import Form from '../../components/Form'
import type { GetServerSideProps } from 'next'
import { getCategories } from './api/db/category'
import { Button, LoadingOverlay, Modal, Title } from '@mantine/core'
import { useState } from 'react'
import { useDisclosure } from '@mantine/hooks'

type Props = {
    categories: string[]
}

export default function Home({ categories }: Props) {
    const [loading, setLoading] = useState(false)
    const [opened, { open, close }] = useDisclosure(false)

    return (
        <>
            <LoadingOverlay visible={loading} />
            <Title order={2} align='center'>Home</Title>
            <Link
                href={'/spendings'}
                className='bg-red-300 p-1 rounded-md'
                onClick={() => setLoading(true)}>See Spendings</Link>
            <Button onClick={open} style={{ backgroundColor: 'blue' }}>Open Modal</Button>
            <Modal opened={opened} onClose={close} title='Add new spending'>
                <Form categories={categories} />
            </Modal>
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
