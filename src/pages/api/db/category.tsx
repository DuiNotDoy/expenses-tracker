import { NextApiRequest, NextApiResponse } from "next";
import { Category } from "@prisma/client";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const categories = getCategories()
    res.status(200).json(categories)
}

export function getCategories() {
    const categories = Object.keys(Category)
    return categories
}
