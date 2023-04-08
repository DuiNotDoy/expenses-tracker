import { Button, NativeSelect, NumberInput, Paper, TextInput } from "@mantine/core"
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
            value: 1,
            category: categories[0],
        },
        validate: {
            item: isNotEmpty('Do not leave empty field'),
            value: (value) => value < 1 ? 'Enter a valid item value' : null,
            category: (value) => !categories.includes(value) ? 'Select valid category' : null
        }
    })


    type SpendingData = {
        item: string
        value: number
        category: string
    }

    async function insertSpending(data: SpendingData) {
        const link = window.location.origin

        const response = await fetch(`${link}/api/db/insert`, {
            method: 'POST',
            credentials: 'include',
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
        <Paper p={'sm'}>
            <form onSubmit={form.onSubmit(async (values) => {
                console.log({ values })
                setSubmitting(true)
                insertSpending(values)
            })}>
                <TextInput
                    mb={'sm'}
                    label='Item Name'
                    placeholder="item"
                    withAsterisk
                    {...form.getInputProps('item')} />
                <NumberInput
                    mb={'sm'}
                    label='Item Value'
                    description='Do not include comma and other special characters'
                    placeholder="value"
                    withAsterisk
                    hideControls
                    {...form.getInputProps('value')}
                    formatter={(value) =>
                        !Number.isNaN(parseFloat(value))
                            ? `₱ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
                            : '₱ '
                    }
                />
                <NativeSelect
                    mb={'sm'}
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
                    className="bg-blue-500"
                    loading={submitting}
                    loaderPosition="center"
                    sx={{ '&[data-loading]': { backgroundColor: 'red' } }}
                >
                    Save
                </Button>
            </form>
        </Paper>
    )
}

