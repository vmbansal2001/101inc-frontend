import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, AuthUser } from "./auth-state-slice-types";

const initialState: AuthState = {
  firebaseLoading: true,
  userLoading: true,
  currentUser: null,
};

const authStateSlice = createSlice({
  name: "authState",
  initialState: initialState,
  reducers: {
    setAuthFirebaseLoading: (state, action: PayloadAction<boolean>) => {
      state.firebaseLoading = action.payload;
    },
    setAuthUserLoading: (state, action: PayloadAction<boolean>) => {
      state.userLoading = action.payload;
    },
    setAuthUser: (state, action: PayloadAction<AuthUser | null>) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setAuthFirebaseLoading, setAuthUserLoading, setAuthUser } =
  authStateSlice.actions;

export default authStateSlice;
