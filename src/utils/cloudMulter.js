import multer from "multer";
export const fileValidation = {
    image: ['image/jpeg', 'image/png', 'image/jfif']
}
export function fileUpload(customValidation = []) {
    const storage = multer.diskStorage({})
    function fileFilter(req, file, cb) {
        if (customValidation.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb("Invalid File Format", false)
        }
    }
    const upload = multer({ fileFilter, storage })
    return upload
}