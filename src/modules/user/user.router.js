import { Router } from 'express'
import { auth } from '../../middleware/auth.js';
import * as userController from './controller/user.js'
import { validation } from './../../middleware/validation.js';
import { UpdateSchema } from './user.validation.js';
import { fileUpload, fileValidation } from '../../utils/cloudMulter.js';
import { endPoint } from './authEndPoint.user.js';
const router = Router();
router.get("/All", auth(endPoint.getusers), userController.getUserModule)
router.get("/", auth(endPoint.getuser), userController.getUser)
router.put("/", auth(endPoint.updateuser), validation(UpdateSchema), userController.updateUser)
router.patch('/', auth(endPoint.softDelete), userController.softDelete)
router.delete('/', auth(endPoint.deleteUser), userController.deleteUser)
router.patch("/picture", auth(endPoint.profilepic), fileUpload(fileValidation.image).single('image'), userController.profilepic)
router.patch("/coverpicture", auth(endPoint.coverpic), fileUpload(fileValidation.image).single('image'), userController.coverPic)
export default router