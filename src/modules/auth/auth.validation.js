import Joi from "joi";
export const signupSchema = {
    body: Joi.object({
        name: Joi.string().alphanum().required(),
        email: Joi.string().email().required(),
        mobilenumber: Joi.string().required().pattern(new RegExp(/^01[0125][0-9]{8}$/)),
        password: Joi.string().pattern(new RegExp(/^[A-Za-z\d]{5,32}$/)),
        Cpassword: Joi.string().valid(Joi.ref("password")).required(),
        age: Joi.number().required()
    }).required()
}
export const loginSchema = {
    body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp(/^[A-Za-z\d]{5,32}$/))
    }).required()
}
export const forgetSchema = {
    body: Joi.object({
        email: Joi.string().email().required(),
    }).required()
}
export const forgotChangePasswordSchema = {
    body: Joi.object({
        newPassword: Joi.string().pattern(new RegExp(/^[A-Za-z\d]{5,32}$/)),
        confirmNewPassword: Joi.string().valid(Joi.ref("newPassword")).required()
    }).required()
}

export const changePasswordSchema = {
    body: Joi.object({
        oldPassword: Joi.string().pattern(new RegExp(/^[A-Za-z\d]{5,32}$/)),
        newPassword: Joi.string().pattern(new RegExp(/^[A-Za-z\d]{5,32}$/)),
        confirmNewPassword: Joi.string().valid(Joi.ref("newPassword")).required()
    }).required()
}