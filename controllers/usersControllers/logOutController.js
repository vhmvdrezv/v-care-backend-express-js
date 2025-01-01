import { logEvents } from "../../middlewares/logEvents.js"
import User from "../../models/User.js";
import jwt from 'jsonwebtoken';
import asyncErrorHandler from '../../utils/asyncErrorHanlder.js';

export const logOutHandler = asyncErrorHandler(async (req, res) => {
    const cookies = req.cookies;
    const refreshToken = cookies?.refreshToken;
    if (!refreshToken) {
        res.clearCookie('refreshToken', { httpOnly: true, secure: true, sameSite: 'None' });
        return res.status(200).json({
            message: "OK, no refreshtoken"
        });
    }

    const user = await User.findOne({ refreshToken });
    
    if (!user) {
        res.clearCookie('refreshToken', { httpOnly: true, secure: true, sameSite: 'None' });
        return res.status(200).json({
            message: "OK, refreshtoken not in db"
        });
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY, async (error, decoded) => {
        if (error || user.refreshToken !== refreshToken) {
            res.clearCookie('refreshToken', { httpOnly: true, secure: true, sameSite: 'None' });
            return res.status(200).json({
                message: "OK, refreshtoken not verified"
            });
        }
        res.clearCookie('refreshToken', { httpOnly: true, secure: true, sameSite: 'None' });
        await user.updateOne({ refreshToken: null});
        await user.save();
        res.sendStatus(204);
    });
});
