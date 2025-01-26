import express from 'express';
import cors from 'cors'
import path from 'path';
import url from 'url';
import logger from './config/logger.js';

import userRouter from './routes/usersRouters/userRouter.js';
import otpRouter from './routes/usersRouters/otpRouter.js';
import cityRouter from './routes/cityRouter.js';
import refreshTokenRouter from './routes/usersRouters/refreshTokenRouter.js';
import citiesRouter from './routes/citiesRouter.js';
import logOutRouter from './routes/usersRouters/logOutRouter.js';
import articlesRouter from './routes/articlesRouter.js';
import uploadArticleImageBodyRouter from './routes/uploadArticleImageBodyRouter.js';
import serviceProvidersRouter from './routes/serviceProvidersRouter.js';
import servicesRouter from './routes/serviceRouter.js';
import TimeSlotRouter from './routes/TimeSlotsRouter.js';
import adminRouter from './routes/adminRouter/adminRouter.js'
import CustomError from './utils/customError.js';
import globalErrorHandler from './controllers/errorController.js';
import usersRouter from './routes/usersRouters/usersRouter.js';
//import { logger } from './middlewares/logEvents.js';
import cookieParser from 'cookie-parser';
import credentials from './middlewares/credentials.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(credentials);

app.use(cors());

// logger middlewares 

app.use(logger);
//app.use(logger);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// parsing cookie
app.use(cookieParser())

app.use('/media', express.static(path.join(__dirname, 'media')));

app.get('/',(req, res) => {
    res.status(200).send('hello, world')
});

app.use('/api/otp', otpRouter);

app.use('/api/user', userRouter);

app.use('/api/users', usersRouter);

app.use('/api/logout', logOutRouter);

app.use('/api/admin', adminRouter)

app.use('/api/refreshtoken', refreshTokenRouter);

app.use('/api/city', cityRouter);

app.use('/api/cities', citiesRouter);

app.use('/api/articles', articlesRouter);

app.use('/api/services', servicesRouter)

app.use('/api/service-providers', serviceProvidersRouter);

app.use('/api/timeslots', TimeSlotRouter)

//app.use('/api/users', usersRouter)

app.use('/api/upload-article-image-body', uploadArticleImageBodyRouter);


app.use('*', (req, res, next) => {
    const error = new CustomError(`Can't find ${req.originalUrl} on this server.`, 404);
    next(error);
});

app.use(globalErrorHandler);

export default app;