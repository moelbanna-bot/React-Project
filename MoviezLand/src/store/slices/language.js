import { createSlice } from "@reduxjs/toolkit";

const languageSlice = createSlice({
  name: "language",
  initialState: {
    value: "en",
    changed: false,
  },
  reducers: {
    setLanguage: (state, action) => {
      state.value = action.payload;
      state.changed = true;
    },
    resetLanguageChanged: (state) => {
      state.changed = false;
    },
  },
});

export const { setLanguage, resetLanguageChanged } = languageSlice.actions;
export default languageSlice.reducer;
