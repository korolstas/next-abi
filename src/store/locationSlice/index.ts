import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Heroes } from "@/types/redux-interfaces";
import { locationHeroes, requestLocation } from "./ActionCreators";

type LocationState = {
  urlLocation: string;
  urlHeroArray: string[];
  localHeroes: Heroes[];

  isLoading: boolean;
  error: string | null;
};

const initialState: LocationState = {
  urlLocation: "",
  localHeroes: [],
  urlHeroArray: [],

  isLoading: false,
  error: null,
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    clearState: (state) => {
      state.localHeroes = [];
      state.urlHeroArray = [];
    },

    postLocation: (state, action) => {
      state.urlLocation = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Location 1
      .addCase(locationHeroes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        locationHeroes.fulfilled,
        (state, action: PayloadAction<any>) => {
          const result = action.payload.residents;
          state.urlHeroArray = result;
          state.isLoading = false;
        }
      )
      .addCase(locationHeroes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Location 2

      .addCase(requestLocation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        requestLocation.fulfilled,
        (state, action: PayloadAction<Heroes[]>) => {
          state.localHeroes = state.localHeroes.concat(action.payload);
          state.isLoading = false;
        }
      )
      .addCase(requestLocation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { postLocation, clearState } = locationSlice.actions;

export default locationSlice.reducer;
