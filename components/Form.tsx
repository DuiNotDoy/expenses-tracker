import { useRef } from "react"

type Props = {
    categories: string[]
}

export default function Form({ categories }: Props) {
    const item = useRef<HTMLInputElement>(null)
    const value = useRef<HTMLInputElement>(null)
    const category = useRef<HTMLSelectElement>(null)

    async function submit() {
        if (!item.current || !value.current || !category.current) return

        const response = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/db/insert`, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                item: item.current.value,
                value: value.current.value,
                category: category.current.value,
            })
        })
        console.log(response.json())
    }

    return (
        <div className='bg-slate-400 outline outline-1 max-w-md mx-auto rounded-md text-left p-2 my-2'>
            <div className='my-2'>
                <label htmlFor='item'>Item Name:</label>
                <input ref={item} type='text' name='item' placeholder='Item name' />
            </div>
            <div className='my-2'>
                <label htmlFor='value'>Item Value:</label>
                <input ref={value} type='text' name='value' placeholder='Php 999' />
            </div>
            <div className='my-2'>
                <label htmlFor='category'>Category</label>
                <select ref={category} name='category'>
                    {
                        categories.map(category => (
                            <option key={category}>
                                {category}
                            </option>
                        ))
                    }
                </select>
            </div>
            <div>
                <button className='bg-blue-400 p-1 rounded-md' onClick={submit}>Submit</button>
            </div>
        </div>
    )
}

