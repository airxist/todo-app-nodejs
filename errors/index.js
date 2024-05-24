const badRequestError = require('./bad-request');
const customApiError = require('./custom-api-error');
const notFoundError = require('./not-found');
const unauthorizationError = require('./unauthorization')

module.exports = {
    badRequestError,
    customApiError,
    notFoundError,
    unauthorizationError
}