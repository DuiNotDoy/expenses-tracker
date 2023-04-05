import { Button, Center, LoadingOverlay, NativeSelect, NumberInput, Paper, TextInput } from "@mantine/core"
import { isNotEmpty, useForm } from "@mantine/form"
import { notifications } from "@mantine/notifications"
import { useState } from "react"

type Props = {
    categories: string[]
}

export default function Form({ categories }: Props) {
    const [submitting, setSubmitting] = useState(false)
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
        if (process.env.NODE_ENV !== 'production') {
            return 'http://localhost:3000'
        } else {
            // return `https://dui-expenses-tracker.vercel.app`
            return `https://${process.env.VERCEL_URL}`
        }
    }

    type SpendingData = {
        item: string
        value: number
        category: string
    }

    async function insertSpending(data: SpendingData) {
        const link = getBaseURL()
        console.log('base url: ', link)
        console.log('vercel: ', process.env.NODE_ENV)
        console.log('vercel: ', process.env.VERCEL_URL)

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

        if (response.ok) {
            notifications.show({
                title: 'Success',
                message: 'Item successfully saved.',
                color: 'teal'
            })
        } else {
            notifications.show({
                title: 'Fail',
                message: 'Could not save item at the moment.',
                color: 'red'
            })
        }
        setSubmitting(false)
    }

    return (
        <Center >
            <Paper p={'sm'} my={'md'}>
                <form onSubmit={form.onSubmit(async (values) => {
                    setSubmitting(true)
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
                    <Button
                        type="submit"
                        mt={'xs'}
                        disabled={submitting}
                        style={{ backgroundColor: 'blue', }}>
                        <LoadingOverlay visible={submitting} loaderProps={{ size: 'sm' }} />
                        Submit
                    </Button>
                </form>
            </Paper>
        </Center>
    )
}

