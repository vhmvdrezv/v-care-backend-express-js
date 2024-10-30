import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: String, // for siteAdmin and companyAdmin
    firstname: String,
    lastname: String,
    age: { // for user
        type: Number 
    },
    gender: { // for user
        type: String,
        enum: ['male', 'female']
    },
    city: { // for user
        type: mongoose.Types.ObjectId,
        ref: 'city'
    },
    address: { // for user
        type: String
    },
    phone: { // for user
        type: String,
        unique: true,
        required: false,
        match: /^(099|093|092|091)\d{8}$/,
        minlength: 11,
        maxlength: 11
    },
    role: {
        type: String,
        enum: ['siteAdmin', 'companyAdmin','user']
    },
    diseaseRecords: { // for user
        diabetes: { type: String, enum: ['yes', 'no'], default: 'no' },
        hypertension: { type: String, enum: ['yes', 'no'], default: 'no' },
        heartDisease: { type: String, enum: ['yes', 'no'], default: 'no' },
        asthma: { type: String, enum: ['yes', 'no'], default: 'no' },
    },
    company: { // for companyAdmin
        type: mongoose.Types.ObjectId,
        ref: 'company'
    },
    refreshToken: String
}, {
    timestamps: true
});

export default mongoose.model('user', userSchema);