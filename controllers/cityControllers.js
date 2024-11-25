import City from '../models/City.js';
import { logEvents } from '../middlewares/logEvents.js';
import mongoose from 'mongoose';

export const getAllCities = async (req, res) => {
    try {
        const cities = await City.find({ status: "active" });
        //console.log(cities);        
        if (cities.length === 0) {
            return res.status(200).json({
                message: "شهری یافت نشد.",
                data: {
                    users: []
                }
            });
        }

        res.status(200).json({
            message: "لیست شهرها:",
            data: {
                cities
            }
        });

        
    } catch (err) {
        logEvents(err.message, 'errorLog.txt');
        console.log(err.message);
        res.status(500).json({
            message: err.message
        });
    }
};

export const getCityById = async (req, res) => {
    const cityId = req.params.cityId;

    if (!mongoose.isValidObjectId(cityId)) {
        return res.status(400).json({
            message: "id اشتباه وارد شده است."
        });
    }

    try {
        const city = await City.findById(cityId);
        if (!city) {
            return res.status(404).json({
                message: "شهر با آیدی وارد شده یافت نشد."
            });
        }

        res.status(200).json({
            message: "شهر یافت شد:",
            data: {
                city
            }
        })
    } catch (err) {
        logEvents(err.message, 'errorLog.txt');
        console.log(err.message);
        res.status(500).json({
            message: err.message
        });
    }
};