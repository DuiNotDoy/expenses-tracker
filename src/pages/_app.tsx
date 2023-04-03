import '@/styles/globals.css'
import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut } from '@clerk/nextjs'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import Head from 'next/head'


export default function App({ Component, pageProps }: AppProps) {
    const { pathname } = useRouter()
    const publicPages: string[] = ['/']

    const isPublicPath = publicPages.includes(pathname)

    return (
        <ClerkProvider {...pageProps}>
            {
                isPublicPath ? <Component {...pageProps} /> :
                    <>
                        <SignedIn>
                            <div className="w-full mx-auto max-w-3xl bg-blue-300">
                                <Head>
                                    <title>Expenses Tracker</title>
                                </Head>
                                <Component {...pageProps} />
                            </div>
                        </SignedIn>
                        <SignedOut>
                            <RedirectToSignIn />
                        </SignedOut>
                    </>
            }
        </ClerkProvider>
    )
}
