import { Request, Response, NextFunction } from 'express';
import { launch as launchChromium, Browser, Page } from 'puppeteer';
import { ScrapeRequest } from '../../models/ScrapeRequst';

export const Scraper = async (req: Request, res: Response, next: NextFunction) => {
  const request: ScrapeRequest = req.body;

  // logging section
  console.log(`recieved scrape request for url: ${request.url}`);

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
    page.on('request', req => {
      if (req.resourceType() === 'stylesheet' || req.resourceType() === 'script' || req.resourceType() === 'image') {
        req.abort();
      }
      else {
        req.continue();
      }
    })

    await page.goto(request.url, { waitUntil: 'networkidle0' });
    const html: string = await page.evaluate(() => document.body.innerHTML);
    
    await browser.close();

    res.locals.html = html;
    next();
  } catch (error) {
    throw error;
  }
};