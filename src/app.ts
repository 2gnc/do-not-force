require('dotenv').config({ path: './.env.dev' }); // подключает переменные окружения для локальной разработки и тестов
import * as express from 'express';
import * as bodyParser from 'body-parser';

import './middlewares/bot';
import './sticker-creator';

const { PORT } = process.env;

const app = express()
    .use(express.json())
    .use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`Server is started on port ${PORT}`);
});
