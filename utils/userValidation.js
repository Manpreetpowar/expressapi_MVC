const Joi = require('joi');
const ApiResponse = require('../controllers/api.response');
const httpStatusCodes = require('http-status-codes');

const UserRegisterValidate = (req, res, next) => {
    const schema = Joi.object({
        user_name: Joi.string().min(3).max(100).required(),
        user_id: Joi.string().min(4).max(100).required(),
        password: Joi.string().min(4).alphanum().required(),
        phone: Joi.string().regex(/^\d{10}$/).required().messages({
            'string.pattern.base': 'Phone number must be exactly 10 digits'
        }),
        user_type: Joi.string().valid('customer', 'provider').required(),
        address: Joi.string().min(3).max(100).required(),
        email: Joi.string().email(),
        visiting_charges: Joi.when('user_type', {
            is: 'provider',
            then: Joi.number().required().positive()
                .messages({
                    'number.base': 'Visiting charges must be a number',
                    'number.positive': 'Visiting charges must be a positive number'
                }),
            otherwise: Joi.forbidden() 
        }),
        category: Joi.when('user_type', {
            is: 'provider',
            then: Joi.string().required().messages({
                'any.required': 'Category is required'
            }),
            otherwise: Joi.forbidden() 
        })
    });
// console.log(req.body);
    const { error, value } = schema.validate(req.body, { abortEarly: false });
    // console.log(error);
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

const UserLoginValidate = (req, res, next) => {
    const schema = Joi.object({
        user_id: Joi.string().required(),
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
        return response.send(res);
  
    }
    next();
}


//OTP VALIDATION******************************

const UserOTPValidate = (req, res, next) => {
    const schema = Joi.object({
        phone: Joi.string().regex(/^\d{10}$/).required().messages({
            'string.pattern.base': 'Phone number must be exactly 10 digits'
        }),
        otp: Joi.string().length(4).required(),
    });
    const { error, value } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        // Collect all validation errors as an array of objects
        const errors = error.details.map(detail => ({
            key: detail.context.key,
            value: detail.message.replace(/"/g, '')
        }));
        const response = new ApiResponse(httpStatusCodes.StatusCodes.BAD_REQUEST, errors, {});
        return response.send(res);
  
    }
    next();
}




module.exports = {UserRegisterValidate,UserLoginValidate,UserOTPValidate};
