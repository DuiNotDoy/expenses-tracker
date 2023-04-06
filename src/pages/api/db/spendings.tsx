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
    if (!req.cookies.__session) return res.status(401).json({ message: 'unauthorized' })

    const spendings = await getSpendings(req.cookies.__session)
    res.status(200).json(spendings)
}

export async function getSpendings(session: string) {
    const prisma = new PrismaClient()
    const decoded: JWT = jwtDecode(session)

    const spendings = await prisma.spending.findMany({
        where: {
            userId: decoded.sub
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return JSON.stringify(spendings)
}


