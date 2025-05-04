import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    personal_id: {
        type: String,
        required: true,
        index: true
    },
    user_image: {
        type: String,
        default: "https://api.dicebear.com/9.x/big-ears-neutral/svg?seed=Alexander",
    },
    name: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        default: ""
    },
    phone_number: {
        type: String,
        default: ""
    }
}, {
    timestamps: {
        createdAt: 'joinedAt'
    }
})

userSchema.index({ "personal_id": 1, "email": 1 })

export default mongoose.model("Users", userSchema)