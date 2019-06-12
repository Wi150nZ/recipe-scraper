import { Request, Response } from 'express';
import { ScrapeRequest } from '../../models/ScrapeRequst';

export const Scraper = (req: Request, res: Response) => {
  const request: ScrapeRequest = req.body;
  console.log(`recieved scrape request for url: ${request.url}`)

  res.send({
    'message': 'ACK'
  })
};