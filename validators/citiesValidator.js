import Joi from "joi";

export const addCityValidator = Joi.object({
    name: Joi.string()
        .max(20)
        .required()
        .messages({
            'string.base': 'نام شهر باید text باشد.',
            'string.empty': 'نام شهر نمی تواند خالی باشد.',
            'string.max': 'حداکثر طول نام شهر 20 می باشد.',
            'any.required': 'وارد کردن نام شهر الزامی است.',
        }),
    status: Joi.string()
        .valid('active', 'inactive')
        .required()
        .messages({
            'string.base': 'وضعیت باید text باشد.',
            'any.only': 'وضعیت باید active یا inactive باشد.',
            'any.required': 'وارد کردن وضعیت شهر الزامی است.',
        }),
});

