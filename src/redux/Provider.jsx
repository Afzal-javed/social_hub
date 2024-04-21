"use client"
import { Provider } from "react-redux";
import { store } from "./Store/store";

function Providers({ children }) {
    return (
        <Provider store={store}>
            {/* <PersistGate loading={null} persistor={persistor}> */}
            {children}
            {/* </PersistGate> */}
        </Provider>
    )
}

export default Providers;