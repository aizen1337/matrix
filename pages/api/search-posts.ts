import { searchPosts } from "../../lib/redis-config";
import type { NextApiRequest, NextApiResponse } from 'next'
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
      const query = req.query.query as string;
      const response = await searchPosts(query)
      res.status(200).json({ response })
  }
  