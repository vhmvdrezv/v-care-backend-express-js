const devErrors = (res, err) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        stackTrace: err.stack,
        error: err
    });
}

const prodErrors = (res, err) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    } else {
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong! Please try again later.'
        });
    }
}


export default  (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (err.name === 'CastError') {
        err = new CustomError(`Invalid ${err.path}: ${err.value}.`, 400);
    }

    if (process.env.NODE_ENV === 'development') {
        devErrors(res, err);
    } else if (process.env.NODE_ENV === 'production') {
        prodErrors(res, err);
    }
}; 