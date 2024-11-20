import mongoose, { Schema } from "mongoose";

const citySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    }
},{
    timestamps: true
});

export default mongoose.model('city', citySchema);