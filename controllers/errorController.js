import { logEvents } from "../middlewares/logEvents.js";
import CustomError from "../utils/customError.js";

const devErrors = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        error: err,
        stackTrance: err.stack,
    });
}

const prodErrors = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    } else {
        console.error('ERROR:', err);
        logEvents(err, 'errorLog.txt');
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong!',
        });
    }
}

export default (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (err.name === 'CastError') {
        console.log(err);
        err = new CustomError(`Invalid value for ${err.path}: ${err.value}`, 400);
    }

    if (process.env.NODE_ENV === 'development') {
        devErrors(err, res);
    }   else if (process.env.NODE_ENV === 'production') {
        prodErrors(err, res);
    }
};