const { StatusCodes } = require('http-status-codes')

const errorHandlerMiddleware = (err, req, res, next) => {
    const customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || "Something Broke"
    }

    if(err.name === 'ValidationError'){
        customError.msg = err.message
        customError.statusCode = StatusCodes.BAD_REQUEST
    }
    
    if(err.code == 11000){
        customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please enter another value`;
        customError.statusCode = StatusCodes.BAD_REQUEST;
    }
    
    res.status(customError.statusCode).json({msg: customError.msg});
}


module.exports = errorHandlerMiddleware;