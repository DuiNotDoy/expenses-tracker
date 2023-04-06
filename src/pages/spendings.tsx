import type { GetServerSideProps } from 'next'
import Link from 'next/link'
import { getSpendings } from './api/db/spendings'
import { Flex, Grid, LoadingOverlay, Paper, ScrollArea, Text, Title } from '@mantine/core'
import { useState } from 'react'

type Props = {
    spendings: Spending[]
}

type Spending = {
    id: string
    createdAt: string
    item: string
    value: number
    category: string
}

export default function Spendings({ spendings }: Props) {
    const [loading, setLoading] = useState(false)

    return (
        <>
            <LoadingOverlay visible={loading} />
            <Title order={2} align='center'>Spendings</Title>
            <Flex >
                <Link
                    href={'/home'}
                    className='bg-red-400 p-1 rounded-md'
                    onClick={() => setLoading(true)}>Back to Home</Link>
            </Flex>
            <Grid py={'sm'} justify='center'>
                {
                    spendings.length > 0 ?
                        spendings.map(spending => (
                            <Grid.Col xs={6} key={spending.id}>
                                <Paper withBorder p={'xs'} shadow='sm'>
                                    <p>created: {new Date(spending.createdAt).toLocaleDateString()}</p>
                                    <p>item: {spending.item}</p>
                                    <p>value: {spending.value}</p>
                                    <p>category: {spending.category}</p>
                                </Paper>
                            </Grid.Col>
                        ))
                        : <Text mt={'xs'}>No Record</Text>
                }
            </Grid>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const cookies = context.req.cookies

    if (!cookies || !cookies.__session) return {
        redirect: { destination: '/home' },
        props: {}
    }

    const res = await getSpendings(cookies.__session)
    const spendings = JSON.parse(res)

    return {
        props: {
            spendings
        }
    }
}
