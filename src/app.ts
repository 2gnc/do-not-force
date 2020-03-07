import * as express from 'express';

const PORT = process.env.PORT || 5555;

const app = express().use(express.json());

app.listen(PORT, () => {
    console.log(`Server is started on port ${PORT}`);
});
