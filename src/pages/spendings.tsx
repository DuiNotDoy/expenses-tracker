import type { GetServerSideProps } from 'next'
import Link from 'next/link'

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
        <div className='h-screen'>
            <h1 className='text-center'>Spendings</h1>
            <Link href={'/home'} className='bg-red-300 p-1 rounded-md'>Back to Home</Link>
            <div className='flex gap-4 justify-center bg-slate-400'>
                {
                    spendings.length > 0 ?
                        spendings.map(spending => (
                            <div key={spending.id} className='bg-slate-200 p-2 rounded-md shadow-md'>
                                <p>created: {new Date(spending.createdAt).toLocaleDateString()}</p>
                                <p>item: {spending.item}</p>
                                <p>value: {spending.value}</p>
                                <p>category: {spending.category}</p>
                            </div>
                        ))
                        : <div>no record</div>
                }
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { req } = context

    if (!req.headers.cookie) return {
        redirect: { destination: '/home' },
        props: {}
    }

    const res = await fetch(`${process.env.DOMAIN_NAME}/api/db/spendings`, {
        credentials: 'include',
        headers: {
            Cookie: req.headers.cookie
        }
    })
    const spendings = await res.json()

    return {
        props: {
            spendings
        }
    }
}
