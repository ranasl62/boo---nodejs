const GlobalResponse = require("../response/globalResponse");
const STATUS = require("./statusCode");

module.exports = (err) => {
    if (err.name === "ValidationError") {
        return GlobalResponse(STATUS.CLIENT_ERRORS.BAD_REQUEST, err.message, err.errors);
    } else {
        throw err;
    }
}