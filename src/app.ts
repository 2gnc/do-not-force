import * as express from 'express';
import * as bodyParser from 'body-parser';

const PORT = process.env.PORT || 5555;

const app = express()
    .use(express.json())
    .use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`Server is started on port ${PORT}`);
});
