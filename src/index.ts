import * as express from 'express';
import { Express } from 'express';
import * as bodyParser from 'body-parser';

import { Scraper } from './routes/scrape/index';

const app: Express = express();
const port: number = parseInt(process.env.PORT) || 8080;

app.use(bodyParser.json());

app.post('/fetch-recipe', Scraper);

app.listen(port, () => console.log(`listening on port ${port}...`));