import mongoose, { Schema, model, Types } from 'mongoose'

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    CreatedBy: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    likedBy: [{
        type: Types.ObjectId,
        ref: 'User'
    }],
    isDeleted: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: "public",
        enum: ["public", "private"]
    }
}, {
    timestamps: true
})

const postModel = mongoose.models.Post || model('Post', postSchema)
export default postModel