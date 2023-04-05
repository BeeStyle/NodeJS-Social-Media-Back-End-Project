import postModel from "../../../../DB/model/Post.model.js";
import commentModel from "../../../../DB/model/comment.model.js";
import { errorHandler } from '../../../utils/errorHandling.js';

export const getAllPosts = errorHandler(async (req, res, next) => {
    const cursor = postModel.find({ status: { $eq: "public" }, isDeleted: { $eq: false } }).cursor()
    const posts = []
    for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
        const comment = await commentModel.find({ postId: doc._id, isDeleted: { $eq: false } })
        posts.push({ post: doc, comment })
    }
    return res.status(200).json({ message: "Done", posts })
})

export const addPost = errorHandler(async (req, res, next) => {
    const { title, description } = req.body;
    const post = await postModel.create({ title, description, CreatedBy: req.user.id })
    return res.status(200).json({ message: "Done", post })
})

export const getMyPosts = errorHandler(async (req, res, next) => {
    const cursor = postModel.find({ CreatedBy: req.user.id, isDeleted: { $eq: false } }).cursor()
    const posts = []
    for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
        const comment = await commentModel.find({ postId: doc._id, isDeleted: { $eq: false } })
        posts.push({ post: doc, comment })
    }
    return res.status(200).json({ message: "Done", posts })
})

export const likePost = errorHandler(async (req, res, next) => {
    const postid = req.params.id
    const post = await postModel.findOne({ _id: postid })
    if (!post) {
        return next(new Error('Invalid Post ID', { cause: 400 }))
    }
    if (!post.likedBy.includes(req.user.id)) {
        post.likedBy.push(req.user.id)
        post.likes++
        await post.save()
        return res.status(200).json({ message: "Done", post })
    }
    return next(new Error('Post already is Liked', { cause: 400 }))
})

export const removeLike = errorHandler(async (req, res, next) => {
    const postid = req.params.id
    const post = await postModel.findOne({ _id: postid })
    if (!post) {
        return next(new Error('Invalid Post ID', { cause: 400 }))
    }
    if (post.likedBy.includes(req.user.id)) {
        post.likedBy.pull(req.user.id)
        post.likes--
        await post.save()
        return res.status(200).json({ message: "Done", post })
    }
    return next(new Error('Post is Not Liked', { cause: 400 }))
})

export const softDelete = errorHandler(async (req, res, next) => {
    const postid = req.params.id
    const post = await postModel.findById({ _id: postid })
    if (!post) {
        return next(new Error('Invalid Post ID', { cause: 400 }))
    }
    if (post.CreatedBy != req.user.id) {
        return next(new Error('You are not the owner of this post', { cause: 403 }))
    }
    post.isDeleted = "true"
    await post.save()
    return res.status(200).json({ message: "Done", post })
})

export const removePost = errorHandler(async (req, res, next) => {
    const postid = req.params.id
    await postModel.findByIdAndDelete({ _id: postid })
    return res.status(200).json({ message: "Done" })
})

export const updatePrivacy = errorHandler(async (req, res, next) => {
    const postid = req.params.id
    const { status } = req.body
    const post = await postModel.findByIdAndUpdate({ _id: postid }, { status }, { new: true })
    return res.status(200).json({ message: "Done", post })
})