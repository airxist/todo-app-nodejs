const { StatusCodes } = require("http-status-codes");
const customApiError = require("./custom-api-error");

class badRequestError extends customApiError{
    constructor(message){
        super(message);
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}

module.exports = badRequestError