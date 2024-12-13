import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        default: 'inactive',
        enum : ['active', 'inactive']
    }
},{
    timestamps: true
});

export default serviceSchema;