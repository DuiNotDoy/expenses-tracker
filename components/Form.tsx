import { Button, Center, NativeSelect, NumberInput, Paper, TextInput } from "@mantine/core"
import { isNotEmpty, useForm } from "@mantine/form"

type Props = {
    categories: string[]
}

export default function Form({ categories }: Props) {
    const form = useForm({
        initialValues: {
            item: '',
            value: 0,
            category: categories[0],
        },
        validate: {
            item: isNotEmpty('Please enter an item'),
            value: (value) => value < 1 ? 'Enter a valid item value' : null,
            category: (value) => !categories.includes(value) ? 'Select valid category' : null
        }
    })

    function getBaseURL() {
        if (process.env.NODE_ENV === 'development') {
            return 'http://localhost:3000'
        } else {
            return `https://dui-expenses-tracker.vercel.app`
        }
    }

    type SpendingData = {
        item: string
        value: number
        category: string
    }

    async function insertSpending(data: SpendingData) {
        const link = getBaseURL()

        const response = await fetch(`${link}/api/db/insert`, {
            method: 'POST',
            credentials: 'include',
            mode: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                item: data.item,
                value: data.value,
                category: data.category,
            })
        })
        console.log('response: ', response.json())
    }

    return (
        <Center >
            <Paper p={'sm'} my={'md'}>
                <form onSubmit={form.onSubmit((values) => {
                    insertSpending(values)
                })}>
                    <TextInput
                        label='Item Name'
                        placeholder="item"
                        withAsterisk
                        {...form.getInputProps('item')} />
                    <NumberInput
                        label='Item Value'
                        placeholder="value"
                        withAsterisk
                        {...form.getInputProps('value')} />
                    <NativeSelect
                        label='Item Category'
                        withAsterisk
                        description='Select the category of the item'
                        data={categories}
                        {...form.getInputProps('category')}
                    />
                    <Button type="submit" mt={'xs'} style={{ backgroundColor: 'blue', }}>
                        Submit
                    </Button>
                </form>
            </Paper>
        </Center>
    )
}

