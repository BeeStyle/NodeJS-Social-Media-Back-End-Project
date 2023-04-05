import userModel from "../../../../DB/model/User.model.js";
import { compare, hash } from "../../../utils/generateandcomparehash.js";
import { decodeToken, generateToken } from "../../../utils/generateandverifytoken.js";
import { errorHandler } from './../../../utils/errorHandling.js';
import sendEmail from './../../../utils/email.js';

export const signup = errorHandler(async (req, res, next) => {
    const { name, email, password, mobilenumber, age } = req.body;
    const checkUser = await userModel.findOne({ email })
    if (checkUser) {
        return next(new Error("Email exist"), { cause: 409 })
    }
    const hashpassword = hash({ plainText: password })
    const token = generateToken({ payLoad: { email }, expiresIn: 60 * 60 * 24 * 7 })
    const link = `http://localhost:5000/auth/confirmEmail/${token}`
    const html = `<a href="${link}">Confirm email</a>`
    if (! await sendEmail({ to: email, subject: "Confirm_Email", html })) {
        return next(new Error('Email Rejected', { cause: 400 }))
    }
    const user = await userModel.create([{ name, email, mobilenumber, password: hashpassword, age }])
    return res.status(201).json({ message: "Done", user })

})

export const confirmEmail = errorHandler(async (req, res, next) => {
    const { token } = req.params
    const decoded = decodeToken({ token })
    const user = await userModel.findOneAndUpdate({ email: decoded.email }, { confirmEmail: true })
    if (!user) {
        return next(new Error('Invalid Account', { cause: 404 }))
    }
    return res.status(200).json({ message: "Done" }) //.redirect(" Login Page ")
})

export const login = errorHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email })
    if (!user) {
        return next(new Error("IN-valid Email", { cause: 404 }))
    }
    if (!user.confirmEmail) {
        return next(new Error("Please Confirm Email", { cause: 400 }))
    }
    const match = compare({ plainText: password, hashValue: user.password })
    if (!match) {
        return next(new Error("Invalid password", { cause: 400 }))
    }
    const token = generateToken({
        payLoad: {
            id: user._id, email: user.email, name: user.name, isloggedin: true
        },
        signature: process.env.TOKENSIGNATURE,
        expiresIn: 60 * 60 * 24
    })
    user.isloggedin = true
    await user.save()
    return res.status(200).json({ message: "Done", token })
})

export const LogOut = errorHandler(async (req, res, next) => {
    const user = await userModel.findByIdAndUpdate({ _id: req.user.id }, { isloggedin: false })
    return res.status(200).json({ message: "logged out successfully" })
})

export const forgetPassword = errorHandler(async (req, res, next) => {
    const { email } = req.body
    const token = generateToken({ payLoad: { email }, expiresIn: 60 * 60 * 24 * 7 })
    const link = `http://localhost:5000/auth/forgotChangePassword/${token}` //Front End Link To type in New &Confirm New passwords with token in params
    const html = `<h1>Please Copy the Link into Postman (password changing) For testing purposes because there is no frontend (yet?)</h1>
    <a href="${link}">Change Password</a>`
    if (! await sendEmail({ to: email, subject: "Change Forgotton Password", html })) {
        return next(new Error('Email Rejected', { cause: 400 }))
    }
    return res.status(200).json({ message: "Done" })
})

export const forgotChangePassword = errorHandler(async (req, res, next) => {
    const { token } = req.params
    const decoded = decodeToken({ token })
    const { newPassword } = req.body;
    const user = await userModel.findOne({ email: decoded.email })
    if (!user) {
        return next(new Error("Email Doesn't exist"), { cause: 400 })
    }
    const hashpassword = hash({ plainText: newPassword })
    user.password = hashpassword
    await user.save()
    return res.status(200).json({ message: "Done" })
})

export const changePassword = errorHandler(async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;
    const user = await userModel.findById({ _id: req.user.id })
    const match = compare({ plainText: oldPassword, hashValue: user.password })
    if (!match) {
        return next(new Error("Invalid Old password", { cause: 400 }))
    }
    const hashpassword = hash({ plainText: newPassword })
    user.password = hashpassword
    await user.save()
    return res.status(200).json({ message: "Done" })
})