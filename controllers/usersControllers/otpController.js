import UserOTP from "../../models/UserOTP.js";
import otpPhoneValidator from "../../validators/otpValidators/otpPhoneValidator.js";
import bcrypt from 'bcrypt';
import User from "../../models/User.js";
import { createAccessToken, createRefreshToken } from "../../utils/tokenUtils.js";
import CustomError from "../../utils/customError.js";
import asyncErrorHandler from "../../utils/asyncErrorHanlder.js";

export const sendOtpHandler = asyncErrorHandler(async (req, res) => {
    const { error } = otpPhoneValidator.validate(req.body);
    if ( error ) {
        throw new CustomError(error.message, 400);
    }

    const userOTPExists = await UserOTP.findOne({ phone: req.body.phone });
    
    if (userOTPExists && userOTPExists.expiresAt > Date.now()) {
        throw new CustomError('کد ارسال شده هنوز منقضی نشده است.', 400);
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
});

export const otpConfirmHandler = asyncErrorHandler(async (req, res) => {
    const { phone, otp } = req.body;
    if (!phone || !otp) {
        throw new CustomError('شماره تلفن و کد ارسالی را وارد کنید.', 400);
    }

    const userOTP = await UserOTP.findOne({ phone });
    if (!userOTP) {
        throw new CustomError('خطا دوباره تلاش کنید', 404);
    }

    const otpVerify = await bcrypt.compare(otp, userOTP.otp);
    if (!otpVerify) {
        throw new CustomError('کد ارسالی اشتباه است.', 400);
    }

    if (userOTP.expiresAt < Date.now()) {
        throw new CustomError('کد ارسالی منقضی شده است.', 400);
    }

    await UserOTP.deleteMany({ phone });

    const userExists = await User.findOne({ username: phone });

    const accessToken = createAccessToken({ username: phone, role: "user" });
    const refreshToken = createRefreshToken({ username: phone });

    if (userExists) {

        if (userExists.status !== 'active') {
            throw new CustomError('حساب کاربری شما غیر فعال شده است.', 403);
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
});