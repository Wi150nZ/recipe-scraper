import * as express from 'express';
import { Express } from 'express';
import * as bodyParser from 'body-parser';

import { Chromium } from './injectables/chromium/chromium';
import { Page as Browser } from 'puppeteer';
import { Scraper } from './routes/scrape/scrape';
import { SpendWithPennies } from './middlewares/spend-with-pennies/spend-with-pennies';
import { TasteOfHome } from './middlewares/taste-of-home/taste-of-home';
import { GenericErrorHandler, UnsupportedDomainHandler } from './middlewares/error-handler/error-handler';


const initApp = async () => {
  const app: Express = express();
  const port: number = parseInt(process.env.PORT) || 8080;
  
  app.use(bodyParser.json());

  const chromium: Browser = await Chromium();
  
  app.post('/fetch-recipe', Scraper(chromium));
  
  app.use(SpendWithPennies);
  app.use(TasteOfHome);
  app.use(UnsupportedDomainHandler);
  app.use(GenericErrorHandler);
  
  app.listen(port, () => console.log(`listening on port ${port}...`));
}

initApp();