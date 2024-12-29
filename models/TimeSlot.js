import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TimeSlotSchema = new Schema({
    serviceProvider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ServiceProvider',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['available', 'reserved', 'completed', 'inactive'],
        default: 'available',
    },
    reservedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

TimeSlotSchema.index({ ServiceProvider: 1, date: 1});

export default mongoose.model('TimeSlot', TimeSlotSchema);