import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    profile: {
        type: String,
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    location: {
        type: String,

    },
    occupation: {
        type: String,
    },
    bio: String,
    phoneNumber: String,
    wtpNumber: String,
    githubLinks: String,
    linkedinLinks: String,
    twitterLinks: String,
    instaLinks: String,
    faceBookLinks: String,
    portfolioLinks: String,
    password: {
        type: String,
        required: true
    },
    token: {
        type: String
    },
    friendList: {
        type: Array,
        default: []
    },
}, { timestamps: true })
const User = mongoose.models.User || mongoose.model("User", userSchema)
export default User;