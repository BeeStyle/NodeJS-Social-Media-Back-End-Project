import { Router } from 'express'
import * as authController from './controller/auth.js'
import { validation } from './../../middleware/validation.js';
import * as Schema from './auth.validation.js';
import { auth } from '../../middleware/auth.js';
import { endPoint } from './authEndPoint.auth.js';
const router = Router();
router.post("/signup", validation(Schema.signupSchema), authController.signup)
router.post('/login', validation(Schema.loginSchema), authController.login)
router.get("/confirmEmail/:token", authController.confirmEmail)
router.get("/logout", auth(endPoint.logout), authController.LogOut)
router.post("/forget", validation(Schema.forgetSchema), authController.forgetPassword)
router.post("/forgotChangePassword/:token", validation(Schema.forgotChangePasswordSchema), authController.forgotChangePassword)
router.patch("/changePassword", (auth(endPoint.changePassword)), validation(Schema.changePasswordSchema), authController.changePassword)
export default router