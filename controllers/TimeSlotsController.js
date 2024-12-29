import mongoose from 'mongoose';
import ServiceProvider from '../models/ServiceProvider.js';
import * as datefns from 'date-fns';
import TimeSlot from '../models/TimeSlot.js';

export const getAllTimeSlots = async (req, res) => {
    const { serviceProviderId, date, status } = req.query;

    const filter = {};

    if (serviceProviderId) {
        if (!mongoose.isValidObjectId(serviceProviderId)) {
            return res.status(400).json({
                message: "آیدی خدمات دهنده اشتباه است"
            });
        }
    
        const serviceProviderExists = await ServiceProvider.findById(serviceProviderId);
        if (!serviceProviderExists) {
            return res.status(404).json({
                message: "خدمات دهنده یافت نشد"
            });
        }
        if (serviceProviderExists.status !== 'active') {
            return res.status(400).json({
                message: "خدمات دهنده غیرفعال است"
            });
        }
    
        filter.serviceProvider = serviceProviderId;
    }
    

    if (date) {
        console.log(date);
        const parsedDate = datefns.parse(date, 'yyyy-MM-dd', new Date());
        if (!datefns.isValid(parsedDate)) {
            return res.status(400).json({
                message: "تاریخ اشتباه است"
            });
        }

        const startOfDay = datefns.startOfDay(parsedDate); // Start of the date in UTC
        const endOfDay = datefns.endOfDay(parsedDate);     // End of the date in UTC
    
        console.log(startOfDay, endOfDay);
    
        filter.date = {
            $gte: startOfDay,  // Matches from the start of the date
            $lte: endOfDay     // Matches until the end of the date
        };
    }

    if (req.role === 'admin' && status) {
        filter.status = status;
    } else {    
        filter.status = 'available';
    }

    const timeSlots = await TimeSlot.find(filter);

    res.status(200).json({
        message: "لیست اسلات ها",
        data: {
            timeSlots
        }
    });
};