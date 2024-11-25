import { logEvents } from "../../middlewares/logEvents.js"
import User from "../../models/User.js";
import jwt from 'jsonwebtoken';

export const logOutHandler = async (req, res) => {
    const cookies = req.cookies;
    const refreshToken = cookies?.refreshToken;
    if (!refreshToken) {
        res.clearCookie('refreshToken', { httpOnly: true, secure: true, sameSite: 'None' });
        return res.status(200).json({
            message: "OK, refreshtoken not found"
        });
    }
    try {
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

    } catch (err) {
        logEvents(err.message, 'errorLog.txt');
        console.log(err.message);
        res.status(500).json({
            message: err.message
        });
    }
}
