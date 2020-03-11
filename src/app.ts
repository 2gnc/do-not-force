require('dotenv').config({ path: './.env.dev' }); // подключает переменные окружения для локальной разработки и
import * as express from 'express';
import bot from './middlewares/bot-middleware';
// import * as bodyParser from 'body-parser';

import './sticker-creator';

bot()
    .then(() => {
        const app = express();
        const { PORT } = process.env;
        app.listen(PORT, () => {
            console.log(`Server is started on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error(err);
    });

    // .use(express.json())
    // .use(bodyParser.urlencoded({ extended: true }));
