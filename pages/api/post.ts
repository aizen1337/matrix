import type { NextApiRequest, NextApiResponse } from 'next'
import { createPost } from '../../lib/redis-config'
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const id = await createPost(req.body)
    res.status(200).json({id})
}
