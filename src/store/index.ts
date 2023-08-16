import { combineReducers, configureStore } from "@reduxjs/toolkit";
import heroesSlice from "./heroesSlice";
import userSlice from "./userSlice";
import locationSlice from "./locationSlice";

const reducer = combineReducers({
  heroesSlice,
  locationSlice,
  userSlice,
});

const setupStore = () => {
  return configureStore({
    reducer,
  });
};

export const store = setupStore();

export type RootState = ReturnType<typeof reducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
