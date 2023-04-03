import Link from 'next/link'
import { useEffect, useState } from 'react'

type Spending = {
    id: string
    createdAt: string
    item: string
    value: number
    category: string
    userId: string
}

export default function Spendings() {
    const [spendings, setSpendings] = useState<Spending[]>([])

    useEffect(() => {
        async function getSpendings() {
            const response = await fetch(`/api/db/spendings`)
            const spendings = await response.json()
            setSpendings(spendings)
        }
        getSpendings()
    }, [])

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
