import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    profile: {
        type: String,
        required: true
    },
    post: {
        type: String,
        required: true
    },
    description: String,
    like: {
        type: Array,
        default: []
    },
    comment: {
        type: Array,
        default: []
    }

}, { timestamps: true })
const Post = mongoose.models.Post || mongoose.model("Post", postSchema)
export default Post;