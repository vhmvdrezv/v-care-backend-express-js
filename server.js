import express from 'express';
import mongoose from 'mongoose';
import connectDB from './configs/dbConn.js';

const PORT = process.env.PORT;

const app = express();

connectDB()

app.get('/', (req, res) => {
    res.send('hello, world')
});

// app.use('/api/otp');

mongoose.connection.once('open', () => {
    console.log('mongoDB connected');
    app.listen(PORT, () => console.log(`server is running on PORT ${PORT}`));
})
