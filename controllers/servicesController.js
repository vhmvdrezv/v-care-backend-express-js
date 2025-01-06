import Service from '../models/Service.js';
import asyncErrorHandler from '../utils/asyncErrorHanlder.js';

export const getAllServices = asyncErrorHandler(async (req, res) => {
    const filter = req.role ? (['active', 'inactive'].includes(req?.query?.stauts) ? { status: req.query.status } : { }) : { };

    const services = await Service.find(filter).select('title position status');
    res.status(200).json({
        message: "لیست خدمات",
        data: {
            services
        }
    });
});