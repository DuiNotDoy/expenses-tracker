import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'

export default function Home() {
    return (
        <div className="">
            <header className="p-2">
                <SignedIn>
                    <div className="flex justify-end">
                        <UserButton />
                    </div>
                </SignedIn>
                <SignedOut>
                    <div className="flex justify-end">
                        <SignInButton mode="modal">
                            <button className="bg-red-400 p-1 rounded-md">
                                Sign In
                            </button>
                        </SignInButton>
                    </div>
                </SignedOut>
            </header>
            <main>{/* main content here */}</main>
        </div>
    )
}
