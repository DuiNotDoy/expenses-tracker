import type { GetServerSideProps } from 'next'
import Link from 'next/link'
import { getSpendings } from './api/db/spendings'
import { Grid, Paper, Text, Title } from '@mantine/core'

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

    return (
        <>
            <Title order={2} align='center'>Spendings</Title>
            <Link href={'/home'} className='bg-red-300 p-1 rounded-md'>Back to Home</Link>
            <Grid p={'md'} justify='center'>
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
