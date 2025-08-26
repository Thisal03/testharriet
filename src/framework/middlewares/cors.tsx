// middlewares/cors.ts

import { NextApiRequest, NextApiResponse } from 'next';

export const corsMiddleware = (handler: (req: NextApiRequest, res: NextApiResponse) => void) => {
 return (req: NextApiRequest, res: NextApiResponse) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');

    // If the request method is OPTIONS, respond with a 200 status and end the request
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }

    // Otherwise, proceed with the request
    return handler(req, res);
 };
};
