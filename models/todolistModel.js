import mongoose from "mongoose";

const todolistSchema = mongoose.Schema({
    todo_name: {
        type: String,
        required: true,
        index: true,
    },
    todo_image: {
        type: String,
        required: true,
        default: "https://api.dicebear.com/9.x/icons/svg?seed=Katherine",
    },
    todo_desc: {
        type: String,
        maxlength: 500,
        default: ""
    },
    todo_status: {
        type: String,
        required: true,
        default: "active",
        enum: ["active", "finished"]
    }
}, {
    timestamps: true
})

export default mongoose.model('Todolist', todolistSchema)