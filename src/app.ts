require('dotenv').config({ path: './.env.dev' }); // подключает переменные окружения для локальной разработки и
import * as express from 'express';
import bot from './lib/bot-launch';

const app = express();
const { PORT } = process.env;

bot()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is started on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error(err);
    });

// TODO добавить градиент https://scontent-hel2-1.xx.fbcdn.net/v/t1.0-9/89518103_2838416216226099_1870182404543479808_o.jpg?_nc_cat=106&_nc_sid=2d5d41&_nc_eui2=AeG-_eNZ0Nvro48tgi_-6WXiFK6OIrGvCwehgKw-WWXBJGp-DIq65LcuKe1dHFYoqTwO-sOhH9RoLcVVRaimgiDn7aML6WKWMXQNHo03iGyLeQ&_nc_oc=AQm92dja_pj0IUsCdacNw57CQp8zmo4ff7zq5DAgSUhauI8bbDk2yIMqjE5tqhBJlXlc-aIPsQ49aUGYOSPtkNso&_nc_ht=scontent-hel2-1.xx&oh=705ea2e8fab8fe6baa2885a7dac4cef3&oe=5E91AB0A
// TODO отказаться от color api?
// TODO тесты
// TODO прод окружение
// TODO добавить стикет с информацией и датой обновления
// TODO внедрить winston для логирования
// TODO добавить ретраи на ошибки телеги
// TODO проверять, что bg фигура видна
// TODO упростить файловую структуру
