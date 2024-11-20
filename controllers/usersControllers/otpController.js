import UserOTP from "../../models/UserOTP.js";
import otpPhoneValidator from "../../validators/otpValidators/otpPhoneValidator.js";
import { logEvents } from "../../middlewares/logEvents.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from "../../models/User.js";
import { createAccessToken, createRefreshToken } from "../../utils/tokenUtils.js";

export const sendOtpHandler = async (req, res) => {
    const { error } = otpPhoneValidator.validate(req.body);
    if ( error ) {
        return res.status(400).json({
            message: "wrong phone format"
        });
    }

    try {
        const userOTPExists = await UserOTP.findOne({ phone: req.body.phone });
        
        if (userOTPExists && userOTPExists.expiresAt > Date.now()) {
            return res.status(400).json({
                message: "کد قبلی ارسال شده را وارد کنید"
            })
        }

        await UserOTP.deleteMany({ phone: req.body.phone });

        const otp = `${Math.floor(Math.random() * 9000 + 1000)}`;
        
        // sending otp code with otp service
        console.log(otp);

        const hashedOTP = await bcrypt.hash(otp, 10);
        await UserOTP.create({
            phone: req.body.phone,
            otp: hashedOTP,
            createdAt: Date.now(),
            expiresAt: Date.now() + 1000 * 60 * 2
        });

        res.status(201).json({
            message: "OTP sent",
            data: {
                phone: req.body.phone
            }
        });
    } catch (err) {
        logEvents(err.message, 'errorLog.txt');
        console.log(err.message);
        res.status(500).json({
            message: err.message
        });
    }
};

export const otpConfirmHandler = async (req, res) => {
    const { phone, otp } = req.body;
    if (!phone || !otp) {
        return res.status(400).json({
            message: 'some fields missing'
        });
    }

    try {
        const userOTP = await UserOTP.findOne({ phone });
        if (!userOTP) {
            return res.status(400).json({
                message: " خطا، دوباره تلاش کنید."
            });
        }

        const otpVerify = await bcrypt.compare(otp, userOTP.otp);
        if (!otpVerify) {
            return res.status(400).json({
                message: "کد وارد شده اشتباه است."
            });
        }

        if (userOTP.expiresAt < Date.now()) {
            return res.status(400).json({
                message: 'کد منقضی شده است.'
            })
        }

        await UserOTP.deleteMany({ phone });

        const userExists = await User.findOne({ username: phone });

        const accessToken = createAccessToken({ username: phone, role: "user" });
        const refreshToken = createRefreshToken({ username: phone });

        if (userExists) {

            if (user.status !== 'active') {
                return res.status(401).json({
                    message: "کاربر غیر فعال است."
                })
            };
        
            await User.findOneAndUpdate(
                { username: phone },
                { refreshToken }
            );

            res.cookie(
                'refreshToken',
                refreshToken,
                {
                    maxAge: 2 * 24 * 60 * 60 * 1000,
                    //httpOnly: true ,
                    secure: true,
                    sameSite: 'none'
                }
            );

            return res.status(200).json({
                message: "User Logged In",
                data: {
                    accessToken
                }
            });

            
        } 
            
        await User.create({
            username: phone,
            phone,
            role: "user",
            refreshToken
        });

        res.cookie(
            'refreshToken',
            refreshToken,                
            {
                maxAge: 2 * 24 * 60 * 60 * 1000,
                //httpOnly: true ,
                secure: true,
                sameSite: 'none'
            }
        );

        return res.status(201).json({
            message: "User Signed Up",
            data: {
                accessToken
            }
        });

    } catch (err) {
        logEvents(err.message, 'errorLog.txt');
        console.log(err.message);
        res.status(500).json({
            message: err.message
        });
    }
}