import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
  wishlist: [],
};

const wishlistSlice = createSlice({
  name: "Wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const itemExists = state.wishlist.find((item) => item.id === action.payload.id);
      if (!itemExists) {
        state.wishlist.push(action.payload);
      }
    },
    removeFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;

