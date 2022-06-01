const Joi = require('joi');

const productsDTO = Joi.object({
    name: Joi.string().min(5).required(),
    quantity: Joi.number().positive().required(),
}).messages({
    'any.required': '400-{{#label}} is required',
    'string.base': '400-{{#label}} must be a string',
    'string.min': '422-{{#label}} length must be at least 5 characters long',
    'number.base': '422-{{#label}} must be a number',
    'number.positive': '422-{{#label}} must be greater than or equal to 1',
});
const productsValidation = (req, res, next) => {
    const { error } = productsDTO.validate(req.body);

    if (error) {
        const [code, message] = error.details[0].message.split('-');
        return res.status(code).json({ message });
    }
    next();
};
module.exports = {
    productsValidation,
};