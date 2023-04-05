
import mongoose, { Schema, model } from 'mongoose'

const userSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    mobilenumber: {
        type: String
    },
    age: {
        type: Number
    },
    isloggedin: {
        type: Boolean,
        default: false
    },
    confirmEmail: {
        type: Boolean,
        default: false
    }, isDeleted: {
        type: Boolean,
        default: false
    },
    coverPic: Object,
    profilePic: Object,
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin", "guest"]
    }
}, {
    timestamps: true
})

const userModel = mongoose.models.User || model('User', userSchema)
export default userModel