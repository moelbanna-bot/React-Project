import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    wishlist: [], 
  };

const wishlistSlice = createSlice({
    name : "Wishlist",
    initialState,
    reducers:{
        addToWishlist:(state,action)=>{
            const itemExists = state.wishlist.find((item)=>item.id === action.payload.id);
            if (!itemExists){
                state.wishlist.push(action.payload);
            }
        },
        removeFromWishlist:(state,action)=>{
            state.wishlist = state.wishlist.filter((item)=> item.id !== action.payload.id);
        },
        getWishlist : (state)=>{
            return state.wishlist;
        }
    }
});

export const { addToWishlist, removeFromWishlist, getWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;