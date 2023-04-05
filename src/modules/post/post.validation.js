import Joi from "joi";
import { generalFields } from "../../middleware/validation.js";
export const postSchema = {
    body: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required()
    }).required()
}

export const paramsIdSchema = {
    params: Joi.object({
        id: generalFields.id
    }).required()
}

export const commentSchema = {
    body: Joi.object({
        text: Joi.string().required()
    }).required(),
    params: Joi.object({
        id: generalFields.id
    }).required()
}

export const updatePrivacySchema = {
    body: Joi.object({
        status: Joi.string().valid("public", "private").required()
    }).required(),
    params: Joi.object({
        id: generalFields.id
    }).required()
}