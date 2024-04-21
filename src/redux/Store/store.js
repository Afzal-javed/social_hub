import { configureStore } from "@reduxjs/toolkit"
import userSlice from "../Slice/userSlice"
import postsSlice from "../Slice/postsSlice"
import friendSlice from "../Slice/friendSlice"
import friendPostSlice from "../Slice/friendPostSlice"

export const store = configureStore({
    reducer: {
        user: userSlice,
        posts: postsSlice,
        friend: friendSlice,
        friendPost: friendPostSlice
    }
})
// import { configureStore } from "@reduxjs/toolkit";
// import { persistStore, persistReducer } from "redux-persist";
// // import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
// import userSlice from "../Slice/userSlice";



// // Define the persistConfig
// const persistConfig = {
//     key: "root",
//     storage,
// };

// // Wrap the user reducer with persistence
// const persistedUserReducer = persistReducer(persistConfig, userSlice.reducer);

// // Create the store
// export const store = configureStore({
//     reducer: {
//         user: persistedUserReducer, // Use the persisted user reducer
//     },
// });

// // Export persistor for later use (e.g., in your entry file)
// export const persistor = persistStore(store);
