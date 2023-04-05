import Joi from "joi";
export const UpdateSchema = {
    body: Joi.object({
        name: Joi.string().alphanum().required(),
        mobilenumber: Joi.string().required().pattern(new RegExp(/^01[0125][0-9]{8}$/))
    }).required()
}