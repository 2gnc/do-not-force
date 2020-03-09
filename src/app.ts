import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';

dotenv.config({ path: './.env.dev' });

import './bot';
import './sticker-creator';

const { PORT, NODE_ENV } = process.env;

const app = express()
    .use(express.json())
    .use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`Server is started on port ${PORT}`);
});
