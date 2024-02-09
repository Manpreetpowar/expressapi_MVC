const Joi = require('joi');
const ApiResponse = require('../controllers/api.response');
const httpStatusCodes = require('http-status-codes');

const UserRegisterValidate = (req, res, next) => {
    const schema = Joi.object({
        fullName: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).alphanum().required(),
    });

    const { error, value } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        // Collect all validation errors as an array of objects
        const errors = error.details.map(detail => ({
            key: detail.context.key,
            value: detail.message.replace(/"/g, '')
        }));
        const response = new ApiResponse(httpStatusCodes.StatusCodes.BAD_REQUEST, errors, {});
        response.send(res);
    }
    next();
}

const UserLoginValidate = (req, res, next) => {
    const schema = Joi.object({
        fullName: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).alphanum().required(),
    });

    const { error, value } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        // Collect all validation errors as an array of objects
        const errors = error.details.map(detail => ({
            key: detail.context.key,
            value: detail.message.replace(/"/g, '')
        }));
    //     const response = new ApiResponse(httpStatusCodes.StatusCodes.BAD_REQUEST, errors, {});
    //    return response;
    return res.status(400).json({ message: 'Validation error', errors });
    }
    next();
}




module.exports = {UserRegisterValidate,UserLoginValidate};
