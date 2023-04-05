import mongoose, { Schema, model, Types } from 'mongoose'

const commentSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    CreatedBy: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    postId: {
        type: Types.ObjectId,
        ref: 'Post',
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
    }
}, {
    timestamps: true
})

const commentModel = mongoose.models.Comment || model('Comment', commentSchema)
export default commentModel