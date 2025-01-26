import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Schema = mongoose.Schema;

const TimeSlotSchema = new Schema({
    serviceProvider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'serviceProvider',
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
        ref: 'user'
    }
}, {
    timestamps: true
});

TimeSlotSchema.plugin(mongoosePaginate);

TimeSlotSchema.index({ ServiceProvider: 1, date: 1});

export default mongoose.model('TimeSlot', TimeSlotSchema);