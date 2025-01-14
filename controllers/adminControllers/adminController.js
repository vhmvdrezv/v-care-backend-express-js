import User from "../../models/User.js";
import asyncErrorHanlder from "../../utils/asyncErrorHanlder.js";
import bcrypt from 'bcrypt';
import CustomError from "../../utils/customError.js";
import * as tokenUtils from '../../utils/tokenUtils.js';

export const logInAdmin = asyncErrorHanlder(async(req, res, next) => {

    const { username, password } = req.body;

    if (!username || !password) {
        throw new CustomError('نام کاربری یا رمز عبور وارد نشده است', 400);
    }

    const user = await User.findOne({ username });
    if (!user) throw new CustomError('نام کاربری یا رمز عبور اشتباه است', 401);
    if (user.status !== 'active') throw new CustomError('حساب کاربری غیر فعال است', 401);

    const result = await bcrypt.compare(password, user?.password);
    if (!result) throw new CustomError('نام کاربری یا رمز عبور اشتباه است', 401);

    const accessToken = tokenUtils.createAccessToken({ sub: user._id, role: user.role });
    const refreshToken = tokenUtils.createRefreshToken({ sub: user._id });

    res.cookie('refreshToken', refreshToken,
    {
        maxAge: 2 * 24 * 60 * 60 * 1000,
        //httpOnly: true ,
        secure: true,
        sameSite: 'none'
    });

    res.status(200).json({
        message: "ورود با موفقیت",
        data: {
            accessToken
        }
    })
});