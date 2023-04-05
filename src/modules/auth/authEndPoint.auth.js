import { roles } from "../../middleware/auth.js";

export const endPoint = {
    logout: [roles.Admin, roles.User],
    changePassword: [roles.Admin, roles.User]
}