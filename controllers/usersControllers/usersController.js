import asyncErrorHandler from '../../utils/asyncErrorHanlder.js';
import CustomError from '../../utils/customError.js';
import User from '../../models/User.js';
import updateUserValidator from '../../validators/userValidator/updateUserValidator.js';
import City from '../../models/City.js';

export const getAllUsers = asyncErrorHandler(async(req, res, next) => {
    let { status, page, limit } = req.query;
    
    const filter = { role: 'user' };
    if (['active', 'inactive'].includes(status)) {
        filter.status = status
    } else {
        throw new CustomError('وضعیت ارسالی اشتباه است.', 400);
    }

    
    page = !isNaN(page) && parseInt(page) > 0  ? parseInt(page) : 1;
    limit = !isNaN(limit) && parseInt(limit) > 0 ? parseInt(limit) : 10;

    const option = {
        page,
        limit,
        sort: { createdAt: -1 },
        select: '-createdAt -updatedAt -__v -refreshToken -role'
    };

    const result = await User.paginate(filter, option);

    const baseUrl = `${req.protocol}://${req.get('host')}${req.originalUrl.split('?')[0]}`;

    const nextPage = result.hasNextPage
        ? `${baseUrl}?limit=${limit}&page=${result.nextPage}&status=${status}`
        : null;

    const prevPage = result.hasPrevPage
        ? `${baseUrl}?limit=${limit}&page=${result.prevPage}&status=${status}`
        : null;
    
    res.status(200).json({
        messge: "لیست کاربران:",
        data: {
            users: result.docs,
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

export const updateUser = asyncErrorHandler(async(req, res, next) => {
    const userID = req.params.id;
    const { firstname, lastname, age, gender, address, status, city} = req.body;
    await updateUserValidator.validateAsync(req.body);

    if (status) {
        if (!['active', 'inactive'].includes(status)) {
            throw new CustomError('وضعیت ارسالی اشتباه است.', 400);
        }
    }

    const user = await User.findById(userID);

    if (!user) throw new CustomError(`کاربری با شناسه یافت نشد. ${userID}`, 404);
    if (user.role !== 'user') {
        throw new CustomError('کاربر مورد نظر user نیست', 404);
    }

    if (city) {
        const city = await City.findById(req.body.city);
        if (!city) throw new CustomErrorHandler('شهر یافت نشد.', 404);
    }

    const updatedUser = await User.findByIdAndUpdate(
        userID, 
        { firstname, lastname, age, gender, address, status, city},
        {
            new: true,
            select: '-__v -refreshToken -createdAt -updatedAt'
        }
    );

    res.status(200).json({
        message: 'کاربر ویرایش شد',
        data: {
            user: updatedUser
        }
    });
});