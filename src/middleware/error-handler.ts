import { Errback, Request, Response, NextFunction } from 'express';
import { ScrapeRequest } from '../models/ScrapeRequest';

export const ErrorHandler = (err: Errback, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    console.error(err);
    res.status(500).send('something when wrong!');
  }

  const request: ScrapeRequest = req.body;
  res.status(400).send(`url, ${request.url}, not supported!`);
}