import Joi from 'joi';

const otpPhoneValidator = Joi.object({
    phone: Joi.string().pattern(/^(091|099|093|092)\d{8}$/).required()
})

export default otpPhoneValidator;