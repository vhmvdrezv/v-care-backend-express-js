import otpPhoneValidator from "../../validators/otpValidators/otpPhoneValidator";

const sendOtpHandler = async (req, res) => {
    const { error } = otpPhoneValidator.validate(req.body);
    if ( error ) {
        return res.status(400).json({
            message: "wrong phone format"
        });
    }

    
};