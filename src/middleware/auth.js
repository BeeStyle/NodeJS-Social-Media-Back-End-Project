import userModel from "../../DB/model/User.model.js"
import { decodeToken } from "../utils/generateandverifytoken.js"
import { errorHandler } from './../utils/errorHandling.js';

export const roles = {
    Admin:'admin',
    User:'user',
    Guest:'guest'
}
export const auth = (accessRoles = []) => {
    return errorHandler(async (req, res, next) => {
        const { authorization } = req.headers
        if (!authorization?.startsWith(process.env.BEARERKEY)) {
            return next(new Error("Invalid bearer key"), { cause: 401 })
        }
        const token = authorization.split(process.env.BEARERKEY)[1]
        if (!token) {
            return next(new Error("Token Required"), { cause: 401 })
        }
        const decoded = decodeToken({ token, signature: process.env.TOKENSIGNATURE })
        if (!decoded.id || !decoded.isloggedin) {
            console.log(decoded.isloggedin);
            return res.status(400).json({ message: "Invalid Token PayLoad" })
        }
        const authUser = await userModel.findById(decoded.id).select("name email isDeleted role")
        if (authUser.isloggedin == false) {
            return res.status(400).json({ message: "Please Login" })
        }
                if (authUser.isDeleted) {
            return res.status(400).json({ message: "Account is not in Database due to Deletion" })
        }
        if (!authUser) {
            return res.status(400).json({ message: "Not a Registered account" })
        }
        if (!accessRoles.includes(authUser.role)) {
            return res.status(400).json({ message: "Not authorized" })
        }
        req.user = authUser
        return next()
    })
}