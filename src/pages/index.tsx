import { Button, Container, Flex, Title } from "@mantine/core";
import Link from "next/link";

export default function Home() {

    return (
        <Container size={'sm'} p={'sm'}>
            <Title align="center"> Landing Page </Title>
            <Flex justify={'center'} mt={'sm'}>
                <Link href={'/home'}>
                    <Button className="bg-blue-500">Get started</Button>
                </Link>
            </Flex>
        </Container>
    )
}

