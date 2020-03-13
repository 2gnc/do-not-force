require('dotenv').config({ path: './.env.dev' }); // подключает переменные окружения для локальной разработки и
import * as express from 'express';
import bot from './middlewares/bot-middleware';

bot()
    .then(() => {
        const app = express();
        const { PORT } = process.env;
        app.listen(PORT, () => {
            console.log(`Server is started on port ${PORT}`);
        });
    })
    .then(() => require('./sticker-creator'))
    .catch((err) => {
        console.error(err);
    });
