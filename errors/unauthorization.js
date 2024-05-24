const { StatusCodes } = require("http-status-codes");
const customApiError = require("./custom-api-error");

class unauthorizationError extends customApiError{
    constructor(message){
        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

module.exports = unauthorizationError