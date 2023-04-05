import { Router } from 'express'
import * as postController from './controller/post.js'
import * as commentController from './controller/comment.js'
import { auth } from '../../middleware/auth.js';
import { validation } from '../../middleware/validation.js';
import { commentSchema, paramsIdSchema, postSchema, updatePrivacySchema } from './post.validation.js';
import { endPoint } from './authEndPoint.post.js';
const router = Router();
router.get("/getAllPosts", auth(endPoint.getallposts), postController.getAllPosts)
router.post("/CreatePost", auth(endPoint.createpost), validation(postSchema), postController.addPost)
router.get("/getMyPosts", auth(endPoint.getMyPosts), postController.getMyPosts)
router.patch("/:id/likePost", auth(endPoint.likePost), validation(paramsIdSchema), postController.likePost)
router.patch("/:id/removeLike", auth(endPoint.removeLike), validation(paramsIdSchema), postController.removeLike)
router.patch("/:id/softDelete", auth(endPoint.softDelete), validation(paramsIdSchema), postController.softDelete)
router.delete("/:id/removePost", auth(endPoint.removePost), validation(paramsIdSchema), postController.removePost)
router.patch("/:id/updatePrivacy", auth(endPoint.updatePrivacy), validation(updatePrivacySchema), postController.updatePrivacy)
//Comment Section
router.post("/:id/CreateComment", auth(endPoint.createcomment), validation(commentSchema), commentController.addComment)
router.patch("/:id/likeComment", auth(endPoint.likeComment), validation(paramsIdSchema), commentController.likeComment)
router.patch("/:id/removeCommentLike", auth(endPoint.removeCommentLike), validation(paramsIdSchema), commentController.removeCommentLike)
router.patch("/:id/softDeleteComment", auth(endPoint.softDeleteComment), validation(paramsIdSchema), commentController.softDeleteComment)
router.delete("/:id/removeComment", auth(endPoint.removeComment), validation(paramsIdSchema), commentController.removeComment)
export default router