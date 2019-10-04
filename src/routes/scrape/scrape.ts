import { Request, Response, NextFunction } from 'express';
import { launch as launchChromium, Browser, Page, Request as ChromiumRequest } from 'puppeteer';
import { ScrapeRequest } from '../../models/ScrapeRequest';

export const Scraper = (page: Page) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const request: ScrapeRequest = req.body;

    try {
      await page.goto(request.url, { waitUntil: 'networkidle0' });
      const html: string = await page.evaluate(() => document.body.innerHTML);
      res.locals.html = html;
      next();
    } catch (error) {
      next(error);
    }
  };
};