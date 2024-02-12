const jwt = require('jsonwebtoken');
const ApiResponse = require('../controllers/api.response');
const httpStatusCodes = require('http-status-codes');
const ensureAuthenticated =(req,res,next) => {
    if(!req.headers['authorization']){
        const response = new ApiResponse(httpStatusCodes.StatusCodes.FORBIDDEN, 'Token is required', {});
        return response.send(res);
    }
    try {
        const decoded = jwt.verify(req.headers['authorization'],process.env.SECRET);
        return next();
    } catch (error) {
        const response = new ApiResponse(httpStatusCodes.StatusCodes.FORBIDDEN, 'Token is not valid, or it\'s expired', {});
        return response.send(res);
    }
}

module.exports = {
    ensureAuthenticated
}