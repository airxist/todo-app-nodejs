const { StatusCodes } = require("http-status-codes");
const customApiError = require("./custom-api-error");

class notFoundError extends customApiError{
    constructor(message){
        super(message);
        this.statusCode = StatusCodes.NOT_FOUND
    }
}

module.exports = notFoundError