import express from 'express';
import mongoose from 'mongoose';
import connectDB from './configs/dbConn.js';
import verifyJWT from './middlewares/verifyJWT.js';
import cors from 'cors'

import userRouter from './routes/usersRouters/userRouter.js';
import otpRouter from './routes/usersRouters/otpRouter.js';
import cityRouter from './routes/cityRouter.js';
import { logger } from './middlewares/logEvents.js';

const PORT = process.env.PORT;

const app = express();

connectDB();

app.use(cors());

app.use(logger);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get( '/',(req, res) => {
    res.send('hello, world')
});

app.use('/api/otp', otpRouter);

app.use('/api/user', userRouter);

app.use('/api/city', cityRouter);


mongoose.connection.once('open', () => {
    console.log('mongoDB connected');
    app.listen(PORT, () => console.log(`server is running on PORT ${PORT}`));
})
