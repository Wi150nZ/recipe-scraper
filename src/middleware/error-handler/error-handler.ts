import { Errback, Request, Response, NextFunction } from 'express';
import { ScrapeRequest } from '../../models/ScrapeRequest';
import { ErrorMessage } from '../../models/ErrorMessage';

export const GenericErrorHandler = (err: Errback, req: Request, res: Response, next: NextFunction) => {
  const error: ErrorMessage = {
    message: 'something broke on our side'
  }
  res.status(500).send(error);
};

export const UnsupportedDomainHandler = (req: Request, res: Response, next: NextFunction) => {
  const request: ScrapeRequest = req.body;
  const error: ErrorMessage = {
    message: `unsupported domain`
  }
  res.status(400).send(error);
}