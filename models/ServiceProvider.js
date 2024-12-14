import mongoose, { Schema } from 'mongoose';

const Schmea = mongoose.Schema;

const serviceProviderSchema = new Schema({
    services: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'service' }]
    },
    role: {
        type: String,
        required: true,
        enum: ["دکتر", "پرستار", "مراقب کودک", "مراقب سالمند"]
    },
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
    age: {
        type: Number,
        min: 18,
        max: 100
    },
    rating: {
        average: { type: Number, default: 0 },
        count: { type: Number, default: 0 }
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"]
    },
    city: {
        type: mongoose.Types.ObjectId,
        ref: "city"
    },
    phone: {
        type: String,
        unique: true,
        required: false,
        match: /^(099|093|092|091)\d{8}$/,
        minlength: 11,
        maxlength: 11
    },
    company: { 
        type: mongoose.Types.ObjectId,
        ref: 'company'
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: "active"
    }
}, {
    timestamps: true
});

export default mongoose.model('serviceProvider', serviceProviderSchema);