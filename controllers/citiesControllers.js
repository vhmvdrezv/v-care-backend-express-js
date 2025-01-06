import City from "../models/City.js";
import { addCityValidator } from "../validators/citiesValidator.js";
import asyncErrorHandler from "../utils/asyncErrorHanlder.js"
import CustomError from "../utils/customError.js";

export const getAllCities = asyncErrorHandler(async (req, res) => {
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

export const addCityHandler = asyncErrorHandler(async (req, res) => {
    const { error } = addCityValidator.validate(req.body);
    if (error) {
        throw new CustomError(error.message, 400);
    }

    const cityNameExists = await City.findOne({ name: req.body.name });
    if (cityNameExists) {
        throw new CustomError('نام شهر تکراری است.', 400);
    }

    const city = await City.create({
        name: req.body.name,
        status: req.body.status
    });

    const { _id , __v, createdAt, updatedAt, ...filteredCity } = city.toObject();

    res.status(201).json({
        message: "شهر اضافه شد.",
        data: {
            city: filteredCity
        }
    })
});