import express from 'express';

const PORT = process.env.PORT;

const app = express();

app.get('/', (req, res) => {
    res.send('hello, world')
});

app.listen(
    PORT,
    console.log(`Server is running on PORT ${PORT}`)
);