import User from "../../models/User.js";
import jwt from 'jsonwebtoken'
import { createAccessToken } from "../../utils/tokenUtils.js";
import CustomError from "../../utils/customError.js";
import asyncErrorHandler from '../../utils/asyncErrorHanlder.js';


export const refreshTokenHandler = asyncErrorHandler(async (req, res) => {
    const refreshToken = req?.cookies?.refreshToken
    if (!refreshToken) {
        throw new CustomError("توکن نامعتبر است.", 400);
    }

    const user = await User.findOne({ refreshToken });
    if (!user) throw new CustomError("کاربر یافت نشد.", 404);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY, (err, decoded) => {
        if (err || decoded.sub !== user._id.toString()) {
            throw new CustomError("توکن نامعتبر است.", 400);
        };

        if (user.status !== 'active') {
            throw new CustomError("حساب کاربری شما غیر فعال شده است.", 403);
        };

        const accessToken = createAccessToken({ sub: user._id, role: user.role });
        return res.status(201).json({
            message: "done",
            data: {
                accessToken
            }
        });
    });
});