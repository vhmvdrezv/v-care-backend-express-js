import Joi from "joi";

export default Joi.object({
    title: Joi.string()
        .max(50)
        .required()
        .messages({
            'string.base': 'عنوان باید یک رشته باشد.',
            'string.empty': 'عنوان نمی‌تواند خالی باشد.',
            'string.max': 'عنوان نمی‌تواند بیش از 255 کاراکتر باشد.',
            'any.required': 'عنوان الزامی است.'
        }),
    body: Joi.string()
        .required()
        .messages({
            'string.base': 'محتوا باید یک رشته باشد.',
            'string.empty': 'محتوا نمی‌تواند خالی باشد.',
            'any.required': 'محتوا الزامی است.'
        }),
    author: Joi.string()
        .max(100)
        .optional()
        .messages({
            'string.base': 'نویسنده باید یک رشته باشد.',
            'string.max': 'نام نویسنده نمی‌تواند بیش از 100 کاراکتر باشد.'
        }),
    status: Joi.string()
        .valid('active', 'inactive')
        .optional()
});