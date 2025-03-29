import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    wishlistIds: [], 
};

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        addToWishlist: (state, action) => {
            if (!state.wishlistIds.find((item)=>item.id === action.payload.id)) {
                state.wishlistIds.push(action.payload);
            }
        },
        removeFromWishlist: (state, action) => {
            state.wishlistIds = state.wishlistIds.filter((item) => item.id !== action.payload.id);
        },
        clearWishlist: (state) => {
            state.wishlistIds = [];
        }
    }
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;