const STATUS = require("../utils/statusCode");
module.exports = (error, response, res) => {
    if (error) {
        return res.status(STATUS.SERVER_ERRORS.INTERNAL_SERVER_ERROR).json({error: error.message});
    }
   return res.status(response.status).json(response);
};