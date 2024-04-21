const { createSlice } = require("@reduxjs/toolkit")


const initialState = {
    postList: []
}

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        allPosts: (state, action) => {

            state.postList = [...action.payload]
        }
    }
})

export const { allPosts } = postSlice.actions
export default postSlice.reducer