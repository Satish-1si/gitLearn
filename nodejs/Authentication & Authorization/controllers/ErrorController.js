const CustomError = require("../utils/CustomError.js");

const handleCastErrorDB = err => {
    const message = `Invalid ID value: ${err.value}. Please pass a valid ID.`;
    return new CustomError(message, 400);
};

const handleDuplicateFieldsDB = err => {
    const value = Object.values(err.keyValue)[0];
    const message = `Duplicate field value: ${value}. Please use a unique value.`;
    return new CustomError(message, 400);
};

const handleValidationErrorDB = err => {
    const errors = Object.values(err.errors).map(el => el.message);
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new CustomError(message, 400);
};

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'Development') {
        console.log("nenu hi avanu..........")
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            stack: err.stack,
            error: err
        });
    } else if (process.env.NODE_ENV === 'Production') {
        let error = { ...err };
        error.message = err.message;
        // moongoose throws 3 types of operational Errors
        if (error.name === 'CastError') error = handleCastErrorDB(error);
        if (error.code === 11000) error = handleDuplicateFieldsDB(error);
        if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
        //handle operational Errors
        if (error.isOperational) {
            res.status(error.statusCode).json({
                status: error.status,
                message: error.message,
            });
        } else {
            console.error('ERROR 💥:', err); // Log for debugging
            res.status(500).json({
                status: 'error',
                message: 'Something went wrong. Please try again...',
            });
        }
    }
};
