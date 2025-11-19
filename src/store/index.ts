import baseApi, {
  baseApiReducer,
  baseApiReducerPath,
} from "@/src/services/base-api";
import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authStateSlice from "./slices/auth-state-slice/auth-state-slice";
import configurationsStateSlice from "./slices/configurations-state-slice/configurations-state-slice";
/* -------------------------------------------------------------------------- */
/*                                Root reducer                                */
/* -------------------------------------------------------------------------- */
const rootReducer = combineReducers({
  authState: authStateSlice.reducer,
  configurations: configurationsStateSlice.reducer,
  [baseApiReducerPath]: baseApiReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

/* -------------------------------------------------------------------------- */
/*                              Store factory fn                              */
/* -------------------------------------------------------------------------- */
export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
    devTools: process.env.NODE_ENV === "development",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [baseApi.reducerPath],
        },
      }).concat(baseApi.middleware),
  });

  // Optional: RTK Query listener helpers
  setupListeners(store.dispatch);

  return store;
};

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
