import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient()
    const body = req.body

    const spendings = await prisma.spending.findMany({
        where: {
            userId: body.session.user.id
        }
    })

    res.status(200).json(spendings)
}
