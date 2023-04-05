import { roles } from "../../middleware/auth.js";

export const endPoint = {
    getallposts: [roles.Admin, roles.User],
    createpost: [roles.Admin, roles.User],
    getMyPosts: [roles.Admin, roles.User],
    likePost: [roles.Admin, roles.User],
    removeLike: [roles.Admin, roles.User],
    softDelete: [roles.Admin, roles.User],
    removePost: [roles.Admin],
    updatePrivacy: [roles.Admin, roles.User],
    //comments
    createcomment: [roles.Admin, roles.User],
    likeComment: [roles.Admin, roles.User],
    removeCommentLike: [roles.Admin, roles.User],
    softDeleteComment: [roles.Admin, roles.User],
    removeComment: [roles.Admin]
}