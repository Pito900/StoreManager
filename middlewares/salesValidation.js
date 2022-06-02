const Joi = require('joi');

const salesDTO = Joi.object({
    productId: Joi.number().positive().required(),
    quantity: Joi.number().positive().required(),
}).messages({
    'any.required': '400-{{#label}} is required',
    'number.positive': '422-{{#label}} must be greater than or equal to 1',
});
const salesValidation = (req, res, next) => {
    const { error } = salesDTO.validate(req.body[0]); // esse [0] foi necessário pq o req.body n ta vindo como um objeto e sim um objeto dentro de um array
    if (error) {
        const [code, message] = error.details[0].message.split('-');
        return res.status(code).json({ message });
    }
    next();
};
module.exports = {
    salesValidation,
};