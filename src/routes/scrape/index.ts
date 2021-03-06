import { Request, Response, NextFunction } from 'express';
import { launch as launchChromium, Browser, Page, Request as ChromiumRequest } from 'puppeteer';
import { ScrapeRequest } from '../../models/ScrapeRequest';

export const Scraper = async (req: Request, res: Response, next: NextFunction) => {
  const request: ScrapeRequest = req.body;

  try {
    const browser: Browser = await launchChromium({
      headless: true,
      args: [
        '--proxy-server="direct://"',
        '--proxy-bypass-list=*'
      ]
    });

    const page: Page = await browser.newPage();
    await page.setRequestInterception(true);
    const requestCallBack: any = (req: ChromiumRequest) => {
      if (req.resourceType() === 'stylesheet' || req.resourceType() === 'script' || req.resourceType() === 'image') {
        req.abort();
      }
      else {
        req.continue();
      }
    };
    page.on('request', requestCallBack);

    await page.goto(request.url, { waitUntil: 'networkidle0' });
    const html: string = await page.evaluate(() => document.body.innerHTML);
    
    await browser.close();

    res.locals.html = html;
    next();
  } catch (error) {
    next(error);
  }
};