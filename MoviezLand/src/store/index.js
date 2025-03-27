import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer from "./slices/wishlist";
import languageReducer from "./slices/language";

const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
    language: languageReducer,
  },
});

export default store;
