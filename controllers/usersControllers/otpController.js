import UserOTP from "../../models/UserOTP.js";
import otpPhoneValidator from "../../validators/otpValidators/otpPhoneValidator.js";
import { logEvents } from "../../middlewares/logEvents.js";
import bcrypt from 'bcrypt';

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