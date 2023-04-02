import { NextApiRequest, NextApiResponse } from 'next'
import { requireAuth } from '@clerk/nextjs/dist/api'
import { ServerGetToken } from '@clerk/types'

interface ClerkRequest extends NextApiRequest {
    auth: {
        userId?: string | null
        sesssionId?: string | null
        getToken: ServerGetToken
    }
}

export default requireAuth(async (req: ClerkRequest, res: NextApiResponse) => {
    const { sesssionId, getToken } = req.auth

    console.log(req.auth)
    res.status(200).json({message: 'hello'})
})

