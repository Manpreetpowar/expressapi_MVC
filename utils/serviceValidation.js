const Joi = require('joi');
const ApiResponse = require('../controllers/api.response');
const httpStatusCodes = require('http-status-codes');

const UserRegisterValidate = (req, res, next) => {
    const schema = Joi.object({
        date: Joi.date().iso().required().messages({
            'date.base': 'Date must be in a valid format (YYYY-MM-DD)',
            'date.iso': 'Date must be in a valid format (YYYY-MM-DD)',
            'any.required': 'Date is required'
        }),
        start_time: Joi.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/).required().messages({
            'string.pattern.base': 'Start time must be in 24-hour format (HH:mm)'
        }),
        end_time: Joi.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/).required().messages({
            'string.pattern.base': 'End time must be in 24-hour format (HH:mm)'
        }),
        visiting_charges: Joi.number().required().positive()
                .messages({
                    'number.base': 'Visiting charges must be a number',
                    'number.positive': 'Visiting charges must be a positive number'
        }),

        per_hour_charges: Joi.number().required().positive().messages({
            'number.base': 'Visiting charges must be a number',
            'number.positive': 'Visiting charges must be a positive number'
        }),

        app_charges: Joi.number().required().positive().messages({
            'number.base': 'Visiting charges must be a number',
            'number.positive': 'Visiting charges must be a positive number'
        }),
        work_time:Joi.string(),
        origin: Joi.string().min(3).max(100).required(),
        origin_latitude: Joi.string().min(4).max(100).required(),
        origin_longitude: Joi.string().min(4).max(100).required(),
        destination: Joi.string().min(4).max(100).required(),
        destination_latitude: Joi.string().min(4).max(100).required(),
        destination_longitude: Joi.string().min(4).max(100).required(),
        distance: Joi.string().required(),
        phone: Joi.string().regex(/^\d{10}$/).required().messages({
            'string.pattern.base': 'Phone number must be exactly 10 digits'
        }),
        status: Joi.string().valid('not_started', 'started','completed'),
        payment_status: Joi.string().valid('pending', 'paid'),
        customer_comment: Joi.string().required(),
        technician_comment: Joi.string().required(),
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

module.exports = {UserRegisterValidate};
