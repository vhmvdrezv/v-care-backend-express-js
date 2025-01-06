import City from "../../models/City.js"
import User from "../../models/User.js"
import CustomErrorHandler from '../../utils/customError.js';
import asyncErrorHandler from '../../utils/asyncErrorHanlder.js';

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
        throw new CustomErrorHandler('کاربر یافت نشد.', 404);
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
    const { error } = req.body;
    if (error) throw new CustomErrorHandler(error.message, 400);


    if (req.body.city) {
        const city = await City.findById(req.body.city);
        if (!city) throw new CustomErrorHandler('شهر یافت نشد.', 404);
    }

    const user = await User.findById(req.userId);
    if (!user) throw new CustomErrorHandler('کاربر یافت نشد.', 404);

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