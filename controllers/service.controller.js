const ServiceModel = require('../models/service.model');
const httpStatusCodes = require('http-status-codes');
const ApiResponse = require('../controllers/api.response');

class ServiceController{

    applyService = async (req, res) => {
      try {
            const service =  new ServiceModel(req.body);
            response = await service.save();
            const responsedata = new ApiResponse(httpStatusCodes.StatusCodes.CREATED, 'Job request has been sent', response);
            return responsedata.send(res);
        } catch (error) {
            const response = new ApiResponse(httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR, error.message, {});
            return response.send(res);
        }

    }
}
module.exports = ServiceController