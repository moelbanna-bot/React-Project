import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    wishlistIds: [11, 12, 13, 14], 
};

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        addToWishlist: (state, action) => {
            if (!state.wishlistIds.includes(action.payload)) {
                state.wishlistIds.push(action.payload);
            }
        },
        removeFromWishlist: (state, action) => {
            state.wishlistIds = state.wishlistIds.filter(id => id !== action.payload);
        },
        clearWishlist: (state) => {
            state.wishlistIds = [];
        }
    }
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;