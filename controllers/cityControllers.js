import City from '../models/City.js';
import mongoose from 'mongoose';
import asyncErrorHandler from '../utils/asyncErrorHanlder.js';
import CustomError from '../utils/customError.js';

export const getAllCities = asyncErrorHandler(async (req, res) => {
    const cities = await City.find({ status: "active" }).select('name')
    
    res.status(200).json({
        message: "لیست شهرها:",
        data: {
            cities
        }
    });
});

export const getCityById = asyncErrorHandler(async (req, res) => {
    const cityId = req.params.cityId;

    const city = await City.findById(cityId).select('name');
    if (!city) {
        throw new CustomError('شهری با این شناسه یافت نشد.', 404);
    }

    res.status(200).json({
        message: "شهر یافت شد:",
        data: {
            city
        }
    })
});