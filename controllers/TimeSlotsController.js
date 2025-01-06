import ServiceProvider from '../models/ServiceProvider.js';
import * as datefns from 'date-fns';
import TimeSlot from '../models/TimeSlot.js';
import CustomError from '../utils/customError.js';
import asyncErrorHandler from '../utils/asyncErrorHanlder.js';

export const getAllTimeSlots = asyncErrorHandler(async (req, res) => {

    const { serviceProviderId, date, status } = req.query;

    const filter = {};

    if (serviceProviderId) {
        const serviceProviderExists = await ServiceProvider.findById(serviceProviderId);
        if (!serviceProviderExists) {
            throw new CustomError("خدمات دهنده یافت نشد", 404);
        }
        if (serviceProviderExists.status !== 'active') {
            throw new CustomError("خدمات دهنده غیر فعال است", 400);
        }
    
        filter.serviceProvider = serviceProviderId;
    }
    

    if (date) {
        const parsedDate = datefns.parse(date, 'yyyy-MM-dd', new Date());
        if (!datefns.isValid(parsedDate)) {
            throw new CustomError("تاریخ نامعتبر است", 400);
        }

        const startOfDay = datefns.startOfDay(parsedDate); 
        const endOfDay = datefns.endOfDay(parsedDate);     
    
        filter.date = {
            $gte: startOfDay,  
            $lte: endOfDay     
        };
    }

    if (req.role === 'admin' && status) {
        filter.status = status;
    } else {    
        filter.status = 'available';
    }

    const timeSlots = await TimeSlot.find(filter).select('-__v -createdAt -updatedAt');

    res.status(200).json({
        message: "لیست اسلات ها",
        data: {
            timeSlots
        }
    });
    
});


export const reserveTimeSlot = asyncErrorHandler(async (req, res) => {    
        //req.user = '674449f7686b3c14b6e20725'
    const timeSlotId = req.params.timeSlotId;

    if (!timeSlotId) {
        throw new CustomError("آیدی بازه زمانی ارسال نشده است.", 400);
    };

    const timeSlot = await TimeSlot.findById(timeSlotId);

    if (timeSlot.status !== 'available') {
        throw new CustomError(`بازه زمانی ${timeSlot.status === 'reserved' ? 'قبلا رزرو شده است' : 'غیر فعال است'}`, 400);
    }

    if (!timeSlot) {
        throw new CustomError("بازه زمانی یافت نشد", 404);
    }

    const updatedTimeSlot = await TimeSlot.findByIdAndUpdate(
        timeSlotId,
        {
            status: 'reserved',
            reservedBy: req.userId
        }, 
        {
            new: true,
            select: '-__v -createdAt -updatedAt'
        },
    );

    res.status(200).json({
        message: "رزرو با موفقیت انجام شد.",
        data: {
            timeSlot: updatedTimeSlot
        }
    })
});