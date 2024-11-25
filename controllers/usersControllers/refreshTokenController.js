import User from "../../models/User.js";
import jwt from 'jsonwebtoken'
import { createAccessToken } from "../../utils/tokenUtils.js";
import { logEvents } from "../../middlewares/logEvents.js";


export const refreshTokenHandler = async (req, res) => {
    const refreshToken = req?.cookies?.refreshToken
    if (!refreshToken) {
        return res.status(401).json({
            message: "refreshToken cookie not found found."
        })
    }

    // if (!refreshToken.startsWith('Bearer ')) {
    //     return res.status(401).json({
    //         message: "refreshToken not valid"
    //     });
    // }

    try {
        const user = await User.findOne({ refreshToken });
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY, (err, decoded) => {
            if (err || decoded.username !== user.username) {
                return res.status(401).json({
                    message: "توکن نامعتبر است."
                })
            };

            if (user.status !== 'active') {
                return res.status(401).json({
                    message: "کاربر غیر فعال است."
                })
            };

            const accessToken = createAccessToken({ username: user.username, role: user.username });
            return res.status(201).json({
                message: "done",
                data: {
                    accessToken
                }
            })
        });
    } catch (err) {
        logEvents(err.message, 'errorLog.txt');
        console.log(err.message);
        res.status(500).json({
            message: err.message
        });
    }
};