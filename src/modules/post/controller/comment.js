import postModel from "../../../../DB/model/Post.model.js";
import commentModel from "../../../../DB/model/comment.model.js";
import { errorHandler } from "../../../utils/errorHandling.js";

export const addComment = errorHandler(async (req, res, next) => {
    const { text } = req.body;
    const ID = req.params.id;
    if (!await postModel.findById(ID)) {
        return next(new Error('Invalid Post ID', { cause: 404 }))
    }
    const comment = await commentModel.create({ text, CreatedBy: req.user.id, postId: ID })
    return res.status(200).json({ message: "Done", comment })
})

export const likeComment = errorHandler(async (req, res, next) => {
    const commentid = req.params.id
    const comment = await commentModel.findOne({ _id: commentid })
    if (!comment) {
        return next(new Error('Invalid comment ID', { cause: 400 }))
    }
    if (!comment.likedBy.includes(req.user.id)) {
        comment.likedBy.push(req.user.id)
        comment.likes++
        await comment.save()
        return res.status(200).json({ message: "Done", comment })
    }
    return next(new Error('comment already is Liked', { cause: 400 }))
})

export const removeCommentLike = errorHandler(async (req, res, next) => {
    const commentid = req.params.id
    const comment = await commentModel.findOne({ _id: commentid })
    if (!comment) {
        return next(new Error('Invalid comment ID', { cause: 400 }))
    }
    if (comment.likedBy.includes(req.user.id)) {
        comment.likedBy.pull(req.user.id)
        comment.likes--
        await comment.save()
        return res.status(200).json({ message: "Done", comment })
    }
    return next(new Error('comment is Not Liked', { cause: 400 }))
})

export const softDeleteComment = errorHandler(async (req, res, next) => {
    const commentid = req.params.id
    const comment = await commentModel.findById({ _id: commentid })
    if (!comment) {
        return next(new Error('Invalid comment ID', { cause: 400 }))
    }
    if (comment.CreatedBy != req.user.id) {
        return next(new Error('You are not the owner of this comment', { cause: 403 }))
    }
    comment.isDeleted = "true"
    await comment.save()
    return res.status(200).json({ message: "Done", comment })
})

export const removeComment = errorHandler(async (req, res, next) => {
    const commentid = req.params.id
    await commentModel.findByIdAndDelete({ _id: commentid })
    return res.status(200).json({ message: "Done" })
})