import Link from 'next/link'
import Form from '../../components/Form'
import type { GetServerSideProps } from 'next'
import { getCategories } from './api/db/category'
import { Button, Flex, LoadingOverlay, Modal, Title } from '@mantine/core'
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
            <Flex px={'sm'} justify={'space-between'}>
                <Link
                    href={'/spendings'}
                    className='bg-red-400 p-1 rounded-md'
                    onClick={() => setLoading(true)}
                >
                    View Expenses
                </Link>
                <Button onClick={open} className='bg-blue-500'>Add Expense</Button>
            </Flex>
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
