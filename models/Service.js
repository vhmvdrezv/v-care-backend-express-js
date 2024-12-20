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
    position: {
        type: Number,
        reqired: true,
        unique: true
    },
    status: {
        type: String,
        default: 'active',
        enum : ['active', 'inactive']
    }
},{
    timestamps: true
});

export default mongoose.model('service', serviceSchema);