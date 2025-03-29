import { createSlice } from "@reduxjs/toolkit";

const languageSlice = createSlice({
  name: "language",
  initialState: { value: "en" }, // Default language
  reducers: {
    setLanguage: (state, action) => {
      state.value = action.payload; // Update language
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;