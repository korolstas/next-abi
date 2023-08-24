import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AllHeroes, HeroesState } from "./types";
import { loadHeroes } from "./actions";

const initialState: HeroesState = {
  modalType: "",
  modalData: null,
  endPage: 0,
  heroes: [],
  isLoading: false,
  error: null,
  hasMore: false,

  // search
  search: "",

  // PopUpWindow

  windowError: [],
  windowSuccess: [],
};

const heroesSlice = createSlice({
  name: "heroes",
  initialState,
  reducers: {
    clearState: (state) => {
      state.modalData = null;
      state.modalType = "";
      state.isLoading = true;
      state.heroes = [];
      state.endPage = 1;
    },
    loading: (state) => {
      state.isLoading = true;
    },
    showModal: (state, { payload }) => {
      if (state.modalType) {
        state.modalType = "";
        return;
      }
      state.modalType = payload.modalType;
      state.modalData = payload.hero || null;
    },
    clearError: (state) => {
      state.error = null;
    },

    // Search

    clearSearch: (state) => {
      state.heroes = [];
      state.endPage = 1;
      if (state.error) state.error = null;
    },
    addSearch: (state, { payload }) => {
      state.search = payload;
    },

    // PopUpWindow

    setWindowSuccess: (state, { payload }) => {
      state.windowSuccess.push(payload);
    },
    setWindowError: (state, action) => {
      if (typeof(action.payload.code) === 'string') state.windowError.push(action.payload.code);
      if (typeof(action.payload) === 'string') state.windowError.push(action.payload);
    
    },
    deletePopUpInfo: (state) => {
      state.windowError = [];
      state.windowSuccess = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadHeroes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        loadHeroes.fulfilled,
        (state, action: PayloadAction<any>) => {
          const result = action.payload;
          state.heroes = [...state.heroes, ...result.results];
          state.hasMore = result.results.length > 0;
          state.endPage = result.info.pages;
          state.isLoading = false;
          state.error = "";
        }
      )
      .addCase(loadHeroes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  clearSearch,
  addSearch,
  setWindowSuccess,
  setWindowError,
  deletePopUpInfo,
  loading,
  clearError,
  clearState,
  showModal,
} = heroesSlice.actions;

export const heroesReducer = heroesSlice.reducer;
