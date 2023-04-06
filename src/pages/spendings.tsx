import type { GetServerSideProps } from 'next'
import Link from 'next/link'
import { getSpendings } from './api/db/spendings'
import { Flex, Grid, LoadingOverlay, Paper, Text, Title, Affix, Button, Transition, rem } from '@mantine/core'
import { useState } from 'react'
import { useWindowScroll } from '@mantine/hooks';

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
    const [scroll, scrollTo] = useWindowScroll();

    return (
        <>
            <LoadingOverlay visible={loading} />
            <Title order={2} align='center'>Spendings</Title>
            <Flex px={'sm'}>
                <Link
                    href={'/home'}
                    className='bg-red-400 p-1 rounded-md'
                    onClick={() => setLoading(true)}>Back to Home</Link>
            </Flex>
            <Grid p={'sm'} justify='center'>
                {
                    spendings.length > 0 ?
                        spendings.map(spending => (
                            <Grid.Col xs={6} key={spending.id}>
                                <Paper withBorder p={'xs'} shadow='sm' radius={'md'}>
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

            {/*scroll to top button*/}
            <Affix position={{ bottom: rem(20), right: rem(20) }}>
                <Transition transition="slide-up" mounted={scroll.y > 0}>
                    {(transitionStyles) => (
                        <Button
                            className='bg-blue-500'
                            style={transitionStyles}
                            onClick={() => scrollTo({ y: 0 })}
                        >
                            Scroll to top
                        </Button>
                    )}
                </Transition>
            </Affix>
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
