
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: "",
    profile: "",
    firstName: "",
    lastName: "",
    email: "",
    friendList: [],
    location: "",
    occupation: "",
    bio: "",
    phoneNumber: "",
    wtpNumber: "",
    githubLinks: "",
    twitterLinks: "",
    faceBookLinks: "",
    instaLinks: "",
    linkedinLinks: "",
    portfolioLinks: ""
}

const friendSlice = createSlice({
    name: "friend",
    initialState,
    reducers: {
        friendInfo: (state, action) => {
            state.id = action.payload._id;
            state.profile = action.payload.profile;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.email = action.payload.email;
            state.location = action.payload.location;
            state.occupation = action.payload.occupation;
            state.bio = action.payload.bio;
            state.friendList = [...action.payload.friendList];
            state.phoneNumber = action.payload.phoneNumber;
            state.wtpNumber = action.payload.wtpNumber;
            state.githubLinks = action.payload.githubLinks;
            state.twitterLinks = action.payload.twitterLinks;
            state.linkedinLinks = action.payload.linkedinLinks;
            state.portfolioLinks = action.payload.portfolioLinks;
            state.faceBookLinks = action.payload.faceBookLinks;
            state.instaLinks = action.payload.instaLinks;
        }

    }
})

export const { friendInfo } = friendSlice.actions

export default friendSlice.reducer