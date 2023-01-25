import { createIndex } from "../../lib/redis-config";
import type { NextApiRequest, NextApiResponse } from 'next'
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
      await createIndex()
      res.status(200).json('ok')
  }
  