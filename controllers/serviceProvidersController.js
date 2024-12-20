import mongoose from "mongoose";
import { logEvents } from "../middlewares/logEvents.js";
import Service from "../models/Service.js";
import ServiceProvider from "../models/ServiceProvider.js";
import City from "../models/City.js";


export const getAllServiceProviders = async (req, res) => {
    try {
        const { status, serviceId, cityId } = req.query;

        const filter = {};

        if (req.role === 'admin') {
            if (['active', 'inactive'].includes(status)) {
                filter.status = status;
            }
        } else {
            filter.status = 'active'
        }

        if (serviceId) {
            if (!mongoose.isValidObjectId(serviceId)) {
                return res.status(400).json({
                    message: "آیدی خدمات اشتباه است."
                });
            }
            const service = await Service.findById(serviceId);
            if (service?.status !== 'active') {
                return res.status(404).json({
                    message: "خدمات مورد نظر غیر فعال است."
                });
            }

            filter.services = { $in: [serviceId] };
        }

        if (cityId) {
            if (!mongoose.isValidObjectId(cityId)) {
                return res.status(400).json({
                    message: "آیدی شهر اشتباه است."
                });
            }
            const city = await City.findById(cityId);

            if (city?.status !== 'active') {
                return res.status(404).json({
                    message: "شهر مورد نظر غیر فعال است."
                });
            }

            filter.city = { $in: [cityId] };
        }

        const serviceProviders = await ServiceProvider.find(filter).populate('services').populate('city');

        return res.status(200).json({
            message: "لیست خدمات دهندگان",
            data: {
                serviceProviders
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
