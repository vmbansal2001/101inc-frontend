import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ConfigurationsState } from "./configurations-state-slice-types";

const initialState: ConfigurationsState = {
  language: "en",
};

const configurationsStateSlice = createSlice({
  name: "configurations",
  initialState: initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<LanguageType>) => {
      state.language = action.payload;
    },
  },
});

export const { setLanguage } = configurationsStateSlice.actions;

export default configurationsStateSlice;
