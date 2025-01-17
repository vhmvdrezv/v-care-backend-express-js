import asyncErrorHandler from '../../utils/asyncErrorHanlder.js';
import CustomError from '../../utils/customError.js';
import User from '../../models/User.js';

export const getAllUsers = asyncErrorHandler(async(req, res, next) => {
    let { status, page, limit } = req.query;

    const baseUrl = `${req.protocol}://${req.get('host')}${req.originalUrl.split('?')[0]}`;

    
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