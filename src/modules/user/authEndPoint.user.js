import { roles } from "../../middleware/auth.js";

export const endPoint = {
    getusers: [roles.Admin],
    getuser: [roles.Admin, roles.User],
    updateuser: [roles.Admin, roles.User],
    softDelete: [roles.Admin, roles.User],
    deleteUser: [roles.Admin],
    profilepic: [roles.Admin, roles.User],
    coverpic: [roles.Admin, roles.User]
}