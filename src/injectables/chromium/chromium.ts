import { launch as launchChromium, Browser, Page, Request as ChromiumRequest } from 'puppeteer';

export const Chromium = async (): Promise<Page> => {

  console.log('instaniating the headless Chromium');
  // instaniate the headless Chromium
  const browser: Browser = await launchChromium({
    headless: true,
    args: [
      '--proxy-server="direct://"',
      '--proxy-bypass-list=*'
    ]
  });

  const page: Page = await browser.newPage();

  // settings
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

  return page;
}