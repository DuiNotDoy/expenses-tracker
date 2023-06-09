import '@/styles/globals.css'
import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { AppShell, Container, Flex } from '@mantine/core'
import { Notifications } from '@mantine/notifications'

export default function App({ Component, pageProps }: AppProps) {
    const { pathname } = useRouter()
    const publicPages: string[] = ['/']

    const isPublicPath = publicPages.includes(pathname)

    return (
        <ClerkProvider {...pageProps}>
            <Head>
                <title>Expenses Tracker</title>
            </Head>
            <Notifications />
            {
                isPublicPath ? <Component {...pageProps} /> :
                    <>
                        <SignedIn>
                            <AppShell padding={0} header={<MyHeader />}>
                                <Container size={'sm'} px={0} >
                                    <Component {...pageProps} />
                                </Container>
                            </AppShell>
                        </SignedIn>
                        <SignedOut>
                            <RedirectToSignIn />
                        </SignedOut>
                    </>
            }
        </ClerkProvider>
    )
}


function MyHeader() {
    return (
        <Flex justify={'end'} px={'sm'} py={4} mb={'sm'} className='bg-white shadow-lg'>
            <UserButton />
        </Flex>
    )
}
