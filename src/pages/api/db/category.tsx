import { NextApiResponse } from "next";
import { Category } from "@prisma/client";

export default function handler(res: NextApiResponse) {
    const categories = Object.keys(Category)
    res.status(200).json(categories)
}
