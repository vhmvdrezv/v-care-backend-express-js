import mongoose from "mongoose";

const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: String,
    }
}, {
    timestamps: true
});

export default mongoose.model('article', articleSchema);