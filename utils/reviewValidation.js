const Joi = require('joi');
const ApiResponse = require('../controllers/api.response');
const httpStatusCodes = require('http-status-codes');

const AddReviewValidate = (req, res, next) => {
    const schema = Joi.object({
        customer: Joi.string().required(),
        provider: Joi.string().required(),
        service: Joi.string().required(),
        rating: Joi.number().integer().min(1).max(5).required(),
        comment: Joi.string().required(),
        reviewer_role: Joi.string().required(),
    });
    const { error, value } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        const errors = error.details.map(detail => ({
            key: detail.context.key,
            value: detail.message.replace(/"/g, '')
        }));
        const response = new ApiResponse(httpStatusCodes.StatusCodes.BAD_REQUEST, errors, {});
        return response.send(res);
    }
    next();
}



module.exports = {AddReviewValidate};
