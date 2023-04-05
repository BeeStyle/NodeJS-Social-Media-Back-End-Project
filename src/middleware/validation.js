import Joi from "joi"
import { Types } from "mongoose"

const dataMethods = ["body", "query", "params"]
const validateObjectId = (value, helper) => {
    return Types.ObjectId.isValid(value) ? true : helper.message("Invalid ObjectID")
}
export const generalFields = {
    id: Joi.string().custom(validateObjectId).required()
}
export const validation = (schema) => {
    return (req, res, next) => {
        const validationErr = []
        dataMethods.forEach(key => {
            if (schema[key]) {
                const validationResult = schema[key].validate(req[key], { abortEarly: false })
                if (validationResult.error) {
                    validationErr.push(validationResult.error.details)
                }
            }
        })
        if (validationErr.length > 0) {
            return next(new Error("validation Error"))
        }
        return next()
    }
}