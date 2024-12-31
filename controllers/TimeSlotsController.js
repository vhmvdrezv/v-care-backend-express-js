import mongoose from 'mongoose';
import ServiceProvider from '../models/ServiceProvider.js';
import * as datefns from 'date-fns';
import TimeSlot from '../models/TimeSlot.js';
import { logEvents } from '../middlewares/logEvents.js';

export const getAllTimeSlots = async (req, res) => {
    try {
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
    }
    catch (err) {
        logEvents(err.message, 'errorLog.txt');
        console.log(err.message);
        res.status(500).json({
            message: err.message
        });
    }
};


export const reserveTimeSlot = async (req, res) => {
    
    try {
        
        //req.user = '674449f7686b3c14b6e20725'
        const timeSlotId = req.params.timeSlotId;

        if (!timeSlotId) {
            return res.status(400).json({
                message: "آیدی بازه زمانی یافت نشد"
            });
        };
    
        if (!mongoose.isValidObjectId(timeSlotId)) {
            return res.status(400).json({
                message: "آیدی بازه زمانی اشتباه است"
            });
        }
    
        const timeSlot = await TimeSlot.findById(timeSlotId);

        if (timeSlot.status !== 'available') {
            return res.status(400).json({
                message: `خطا! بازه زمانی مورد نظر است. ${timeSlot.status}`
            })
        }

        if (!timeSlot) {
            return res.status(404).json({
                message: "بازه زمانی مورد نظر یافت نشد."
            });
        }

        const updatedTimeSlot = await TimeSlot.findByIdAndUpdate(
            timeSlotId,
            {
                status: 'reserved',
                reservedBy: req.user
            }, 
            {
                new: true
            }
        );

        res.status(200).json({
            message: "رزرو با موفقیت انجام شد.",
            data: {
                timeSlot: updatedTimeSlot
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