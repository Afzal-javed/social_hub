const { createSlice } = require("@reduxjs/toolkit")


const initialState = {
    postList: []
}

const friendPostSlice = createSlice({
    name: "friendPost",
    initialState,
    reducers: {
        friendPosts: (state, action) => {

            state.postList = [...action.payload]
        }
    }
})

export const { friendPosts } = friendPostSlice.actions
export default friendPostSlice.reducer