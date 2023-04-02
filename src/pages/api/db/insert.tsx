import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient()
    const body = req.body

    const spending = await prisma.spending.create({
        data: {
            item: body.item,
            value: parseFloat(body.value),
            category: body.category,
            userId: body.userId
        }
    })

    res.status(200).json(spending)
}
