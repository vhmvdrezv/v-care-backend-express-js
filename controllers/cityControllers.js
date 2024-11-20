import City from '../models/City.js';
import { logEvents } from '../middlewares/logEvents.js';

export const getAllCities = async (req, res) => {
    try {
        const cities = await City.find({ status: "active" });
        console.log(cities);        
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