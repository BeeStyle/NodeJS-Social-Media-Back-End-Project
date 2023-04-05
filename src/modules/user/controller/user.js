import userModel from "../../../../DB/model/User.model.js"
import cloudinary from "../../../utils/cloudinary.js";
import { errorHandler } from './../../../utils/errorHandling.js';

export const getUserModule = errorHandler(async (req, res, next) => {
    const users = await userModel.find({})
    return res.status(200).json({ message: "Done", users })
})

export const getUser = errorHandler(async (req, res, next) => {
    const user = await userModel.findById({ _id: req.user.id })
    return res.status(200).json({ message: "Done", user })
})

export const updateUser = errorHandler(async (req, res, next) => {
    const { name, mobilenumber } = req.body
    const user = await userModel.findByIdAndUpdate({ _id: req.user.id },
        { name, mobilenumber }, { new: true }).select('-password')
    return user ? res.status(200).json({ message: "Done", user })
        : next(new Error("In-valid Account ID"), { cause: 400 })
})

export const softDelete = errorHandler(async (req, res, next) => {
    const user = await userModel.findByIdAndUpdate({ _id: req.user.id },
        { isDeleted: true }, { new: true }).select('-password')
    return user ? res.status(200).json({ message: "Done", user })
        : next(new Error("In-valid Account ID"), { cause: 400 })
})

export const deleteUser = errorHandler(async (req, res, next) => {
    const user = await userModel.findByIdAndDelete({ _id: req.user.id }).select("-password")
    return user ? res.status(200).json({ message: "Done", user })
        : next(new Error("In-valid Account ID"), { cause: 400 })
})

export const profilepic = errorHandler(async (req, res, next) => {
    if (!req.file) {
        return next(new Error("Image is Required", { cause: 400 }))
    }
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, { folder: `User/${req.user.id}/profile` })
    const user = await userModel.findByIdAndUpdate(req.user.id, { profilePic: { secure_url, public_id } }, { new: false })
    await cloudinary.uploader.destroy(user.profilePic?.public_id)
    return res.status(200).json({ message: "Done" })
})

export const coverPic = errorHandler(async (req, res, next) => {
    if (!req.file) {
        return next(new Error("Image is Required", { cause: 400 }))
    }
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, { folder: `User/${req.user.id}/Cover` })
    const user = await userModel.findByIdAndUpdate(req.user.id, { coverPic: { secure_url, public_id } }, { new: false })
    await cloudinary.uploader.destroy(user.coverPic?.public_id)
    return res.status(200).json({ message: "Done" })
})