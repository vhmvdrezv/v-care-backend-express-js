import Joi from "joi";

const updateUserValidator = Joi.object({
    firstname: Joi.string().max(20).messages({
        'string.base': 'نام باید یک رشته باشد.',
        'string.max': 'نام نباید بیشتر از 20 کاراکتر باشد.'
    }),
    lastname: Joi.string().max(30).messages({
        'string.base': 'نام خانوادگی باید یک رشته باشد.',
        'string.max': 'نام خانوادگی نباید بیشتر از 30 کاراکتر باشد.'
    }),
    age: Joi.number().min(12).max(100).messages({
        'number.base': 'سن باید یک عدد باشد.',
        'number.min': 'سن نمی‌تواند کمتر از 12 باشد.',
        'number.max': 'سن نمی‌تواند بیشتر از 100 باشد.'
    }),
    gender: Joi.string().valid('مرد', 'زن').messages({
        'any.only': 'جنسیت فقط می‌تواند "مرد" یا "زن" باشد.'
    }),
    address: Joi.string().max(1000).messages({
        'string.base': 'آدرس باید یک رشته باشد.',
        'string.max': 'آدرس نباید بیشتر از 1000 کاراکتر باشد.'
    })
});