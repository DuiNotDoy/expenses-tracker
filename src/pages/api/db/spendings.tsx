import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import jwtDecode from "jwt-decode";

type JWT = {
    azp: string
    exp: number
    iat: number
    iss: string
    nbf: number
    sid: string
    sub: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient()
    const cookies = req.cookies
    console.log({ cookies })

    if (!cookies.__session) return res.status(401).json({ message: 'unauthorized' })

    const decoded: JWT = jwtDecode(cookies.__session)

    const spendings = await prisma.spending.findMany({
        where: {
            userId: decoded.sub
        }
    })

    res.status(200).json(spendings)
}
