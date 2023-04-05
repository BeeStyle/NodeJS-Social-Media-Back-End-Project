import jwt from "jsonwebtoken";

export const generateToken = ({ payLoad,
    signature = process.env.TOKENSIGNATURE,
    expiresIn = 60 * 60 * 24
} = {}) => {
    const token = jwt.sign(payLoad, signature, { expiresIn: parseInt(expiresIn) })
    return token
}
export const decodeToken = ({ token, signature = process.env.TOKENSIGNATURE, } = {}) => {
    const decoded = jwt.verify(token, signature)
    return decoded
}