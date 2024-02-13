const Joi = require('joi');
const ApiResponse = require('../controllers/api.response');
const httpStatusCodes = require('http-status-codes');

const CreateCategoryValidate = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        // image: Joi.binary().encoding('base64').required(),
        status: Joi.string().valid('1', '0').default('1'),
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

const UpdateCategoryValidate = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        // image: Joi.binary().encoding('base64').required(),
        status: Joi.string().valid('1', '0').default('1'),
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





module.exports = {CreateCategoryValidate,UpdateCategoryValidate};
