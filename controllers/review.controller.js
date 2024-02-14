const ReviewModel = require('../models/ReviewModel');
const ApiResponse = require('./api.response');
const httpStatusCodes = require('http-status-codes');

class ReviewController{
    addReview = async (req,res) => {
      try {
        const review = new ReviewModel(req.body);
        const response =  await review.save();
        const responsedata = new ApiResponse(httpStatusCodes.StatusCodes.CREATED, 'Review has been added', response);
        return responsedata.send(res);
      } catch (error) {
        const response = new ApiResponse(httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR, error.message, {});
        return response.send(res);
      }
    }
}
module.exports = ReviewController;

