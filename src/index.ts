import * as express from 'express';
import { Express } from 'express';
import * as bodyParser from 'body-parser';

import { Scraper } from './routes/scrape/index';
import { SpendWithPennies } from './middleware/spend-with-pennies';
import { ErrorHandler } from './middleware/error-handler';

const app: Express = express();
const port: number = parseInt(process.env.PORT) || 8080;

app.use(bodyParser.json());

app.post('/fetch-recipe', Scraper);

app.use(SpendWithPennies);
app.use(ErrorHandler);

app.listen(port, () => console.log(`listening on port ${port}...`));