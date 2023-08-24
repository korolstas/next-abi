import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Heroes } from "@store/heroes";
import { locationHeroes, requestLocation } from "./actions";
import { LocationState } from "./types";

const initialState: LocationState = {
  urlLocation: "",
  localHeroes: [],
  urlHeroArray: [],
  searchLocation: "",

  isLoading: true,
  error: null,
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    clearStateLocation: (state) => {
      state.localHeroes = [];
      state.urlHeroArray = [];
      state.urlLocation = "";
      state.isLoading = true;
      state.error = null;
    },

    postLocation: (state, { payload }) => {
      state.urlLocation = payload.url;
      state.searchLocation = payload.value;
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

export const { postLocation, clearStateLocation } = locationSlice.actions;

export const locationReducer = locationSlice.reducer;
