import Link from 'next/link'
import { useState } from 'react'

export default function Spendings() {
    const [message, setMessage] = useState<any[]>([]);

    return (
        <div>
            <h1>Spendings</h1>
            <Link href={'/'}>Back to Home</Link>
            <button onClick={async () => {
                const response = await fetch('http://localhost:3000/api/')
                const data = await response.json()
                setMessage(curr => [...curr, data])
            }} className='bg-red-300 p-1'>Click Me</button>
            <div>
                {
                    message.map((msg, idx) => (
                        <div key={idx}>
                            {msg.message}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

