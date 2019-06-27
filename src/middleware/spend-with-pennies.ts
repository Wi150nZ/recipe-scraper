import { Request, Response, NextFunction } from 'express';
import { ScrapeRequest } from '../models/ScrapeRequst';

export const SpendWithPennies = (req: Request, res: Response, next: NextFunction) => {
  const request: ScrapeRequest = req.body;
  if (request.url.includes('spendwithpennies')) {
    // TODO: perform scraping here

    res.send(res.locals.html);
  } else {
    next()
  }
}