import Joi from "joi";

const updateUserValidator = Joi.object({
    firstname: Joi.string().length(20),
    lastname:  Joi.string().length(30),
    age: Joi.number().min(0).max(100),
})