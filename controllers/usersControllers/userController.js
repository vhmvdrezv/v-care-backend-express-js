import City from "../../models/City.js";
import User from "../../models/User.js";
import CustomError from '../../utils/customError.js';
import asyncErrorHandler from '../../utils/asyncErrorHanlder.js';
import TimeSlot from '../../models/TimeSlot.js';
import ServiceProvider from "../../models/ServiceProvider.js";

export const getUserProfile = asyncErrorHandler(async (req, res) => {

    let user;
    if (['siteAdmin', 'companyAdmin'].includes(req.role)) {
        user = await User.
            findById(req.userId)
            .populate('city')
            .select('username role company');
    } else {
        user = await User.
            findById(req.userId)
            .populate({
                path: 'city',
                select: '_id name'
            })
            .select('firstname lastname age gender city address phone');
    }
    
    if (!user) {
        throw new CustomError('کاربر یافت نشد.', 404);
    }

    user = user.toObject();
    Reflect.deleteProperty(user, '_id');

    res.status(200).json({
        message: 'Done',
        data: {
            user
        }
    });
});

export const updateUserProfile = asyncErrorHandler(async (req, res) => {
    const { error } = updateUserProfile.validateAsync(req.body);
    if (error) throw new CustomError(error.message, 400);


    if (req.body.city) {
        const city = await City.findById(req.body.city);
        if (!city) throw new CustomError('شهر یافت نشد.', 404);
    }

    const user = await User.findById(req.userId);
    if (!user) throw new CustomError('کاربر یافت نشد.', 404);

    const updatedUser = await User.findByIdAndUpdate(
            req.userId,
        {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            age: req.body.age,
            gender: req.body.gender,
            city: req.body.city,
            address: req.body.address,
        }, {
            new: true,
            select: 'firstname lastname age gender city address -_id'
        }
    );

    return res.status(200).json({
        message: "کاربر با موقفیت ویرایش شد.",
        data: {
            user: updatedUser
        }
    })    
});

export const getUserTimeSlots = asyncErrorHandler(async(req, res, next) => {
    let { status, page, limit } = req.query;
    // const userId = mongoose.Types.ObjectId(req.userId); // Convert userId to ObjectId
    const filter = { reservedBy: req.userId };

    if (['reserved', 'pending'].includes(status)) filter.status = status 
    else status = null;

    const option = {
        page,
        limit,
        sort: { createdAt: -1 },
        select: '-createdAt -updatedAt -__v',
        populate: {
            path: 'serviceProvider',
            select: 'firstname lastname' // Select fields to include from the ServiceProvider collection
        }
    };

    page = !isNaN(page) && parseInt(page) > 0  ? parseInt(page) : 1;
    limit = !isNaN(limit) && parseInt(limit) > 0 ? parseInt(limit) : 10;

    const result = await TimeSlot.paginate(filter, option);

    const baseUrl = `${req.protocol}://${req.get('host')}${req.originalUrl.split('?')[0]}`;

    const nextPage = result.hasNextPage
        ? `${baseUrl}?limit=${limit}&page=${result.nextPage}${status ? `&status=${status}` : ``}`
        : null;

    const prevPage = result.hasPrevPage
        ? `${baseUrl}?limit=${limit}&page=${result.prevPage}${status ? `&status=${status}` : ``}`
        : null;

    res.status(200).json({
        messge: "لیست بازه های زمانی کاربر:",
        data: {
            timeSlots: result.docs,
            totalItems: result.totalDocs,
            totalPages: result.totalPages,
            currentPage: result.page,
            hasNextPage: result.hasNextPage,
            hasPrevPage: result.hasPrevPage,
            nextPage,
            prevPage
        }
    });
});