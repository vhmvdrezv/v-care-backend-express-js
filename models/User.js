import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: String, // for siteAdmin and companyAdmin
    firstname: {
        type: String,
        minlength: 2,
        maxLength: 20
    },
    lastname: {
        type: String,
        minlength: 2,
        maxLength: 20
    },
    age: { // for user
        type: Number,
        min: 12,
        max: 100
    },
    gender: { // for user
        type: String,
        enum: ['مرد', 'زن']
    },
    city: { // for user
        type: mongoose.Types.ObjectId,
        ref: 'city'
    },
    address: { // for user
        type: String,
        maxLength: 1000
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
    // diseaseRecords: { // for user
    //     diabetes: { type: String, enum: ['yes', 'no'], default: 'no' },
    //     hypertension: { type: String, enum: ['yes', 'no'], default: 'no' },
    //     heartDisease: { type: String, enum: ['yes', 'no'], default: 'no' },
    //     asthma: { type: String, enum: ['yes', 'no'], default: 'no' },
    // },
    company: { // for companyAdmin
        type: mongoose.Types.ObjectId,
        ref: 'company'
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: "active"
    },
    refreshToken: {
        type: String, 
        unique: true, // Must be unique
        sparse: true  // Ensures uniqueness applies only to non-null values
    }
}, {
    timestamps: true
});

userSchema.plugin(mongoosePaginate)

export default mongoose.model('user', userSchema);