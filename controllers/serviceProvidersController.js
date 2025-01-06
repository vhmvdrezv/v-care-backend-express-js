import Service from "../models/Service.js";
import ServiceProvider from "../models/ServiceProvider.js";
import City from "../models/City.js";
import CustomError from "../utils/customError.js";
import asyncErrorHandler from '../utils/asyncErrorHanlder.js';


export const getAllServiceProviders = asyncErrorHandler(async (req, res) => {
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
        const service = await Service.findById(serviceId);
        if (service?.status !== 'active') {
            throw new CustomError("خدمت مورد نظر غیر فعال است.", 400);
        }

        filter.services = { $in: [serviceId] };
    }

    if (cityId) {
        const city = await City.findById(cityId);
        if (city?.status !== 'active') {
            throw new CustomError("شهر مورد نظر غیر فعال است.", 400);
        }

        filter.city = { $in: [cityId] };
    }

    const serviceProviders = await ServiceProvider
                                        .find(filter)
                                        .populate('services')
                                        .populate('city')
                                        .select('-__v -createdAt -updatedAt');

    return res.status(200).json({
        message: "لیست خدمات دهندگان",
        data: {
            serviceProviders
        }
    });
});
