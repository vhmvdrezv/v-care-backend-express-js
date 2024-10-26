import { required } from "joi";
import { Schema } from "mongoose";

const citySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive']
    }
},{
    timestamps: true
});