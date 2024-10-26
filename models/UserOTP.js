import mongoose from "mongoose";

const userOTPSchema = new mongoose.Schema({
    phone: {
        type: String,
        unique: true,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: Date,
    expiresAt: Date
}); 

export default mongoose.model('userOTP', userOTPSchema);

