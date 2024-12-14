import { logEvents } from "../middlewares/logEvents.js";
import Service from '../models/Service.js';

export const getAllServices = async (req, res) => {
    try {

        const filter = req.role ? (['active', 'inactive'].includes(req?.query?.stauts) ? { status: req.query.status } : { }) : { };

        const services = await Service.find(filter);
        res.status(200).json({
            message: "لیست خدمات",
            data: {
                services
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


