import { logEvents } from "../middlewares/logEvents.js";
import City from "../models/City.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import { addCityValidator } from "../validators/citiesValidator.js";

export const getAllCities = asyncErrorHandler(async (req, res, next) => {

    let cities;
    if (['active', 'inactive'].includes(req?.query?.status)) {
        cities = await City.find({ status: req?.query?.status });
        return res.status(200).json({
            message: "لیست شهرها:",
            data: {
                cities
            }
        });
    }

    cities = await City.find();
    return res.status(200).json({
        message: "لیست شهرها:",
        data: {
            cities
        }
    });

});

export const addCityHandler = asyncErrorHandler(async (req, res, next) => {
    const { error } = addCityValidator.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: error.message
        });
    }

    
    const cityNameExists = await City.findOne({ name: req.body.name });
    if (cityNameExists) {
        return res.status(409).json({
            message: "اسم شهر موجود می باشد."
        });
    }

    const city = await City.create({
        name: req.body.name,
        status: req.body.status
    });

    res.status(201).json({
        message: "شهر اضافه شد.",
        data: {
        city
        }
    })
});