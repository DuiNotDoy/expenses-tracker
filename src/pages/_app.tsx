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
            <Notifications />
            {
                isPublicPath ? <Component {...pageProps} /> :
                    <>
                        <SignedIn>
                            <Container size={'sm'} px={0} style={{ borderInline: '1px solid' }}>
                                <AppShell padding={0} header={<MyHeader />}>
                                    <Head>
                                        <title>Expenses Tracker</title>
                                    </Head>
                                    <Component {...pageProps} />
                                </AppShell>
                            </Container>
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
        <Flex justify={'end'} p={4} style={{ borderBottom: '1px solid' }}>
            <UserButton />
        </Flex>
    )
}
