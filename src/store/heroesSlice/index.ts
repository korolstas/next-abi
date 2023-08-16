import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AllHeroes, Heroes } from "@/types/redux-interfaces";
import { loadHeroes } from "./ActionCreators";
import { stat } from "fs";

type HeroesState = {
  modalType: string;
  modalData: Heroes | null;
  isLoadedData: boolean;
  currentPage: number;
  endPage: number;
  heroes: Heroes[];
  isLoading: boolean;
  hasMore: boolean;
  error: string | null;

  // search

  search: string;

  // PopUpWindow

  windowError: string[];
  windowSuccess: string[];
};

const initialState: HeroesState = {
  modalType: "",
  modalData: null,
  isLoadedData: false,
  currentPage: 1,
  endPage: 0,
  heroes: [],
  isLoading: true,
  error: null,
  hasMore: false,

  // search
  search: "",

  // PopUpWindow

  windowError: [],
  windowSuccess: [],
};

export const heroesSlice = createSlice({
  name: "heroes",
  initialState,
  reducers: {
    clearState: (state) => {
      state.modalData = null;
      state.isLoadedData = false;
      state.modalType = "";
      state.isLoading = true;
      state.currentPage = 1;
      state.heroes = [];
      state.endPage = 1;
    },
    loadedMarkerTrue: (state) => {
      state.isLoadedData = true;
    },
    loadedMarkerFalse: (state) => {
      state.isLoadedData = false;
      state.isLoading = false;
    },
    loading: (state) => {
      state.isLoading = true;
    },
    showModal: (state, { payload }) => {
      if (state.modalType === "") {
        state.modalType = payload.modalType;
        state.modalData = payload.hero || null;
      } else {
        state.modalType = "";
      }
    },
    clearError: (state) => {
      state.error = null;
    },
    nextPage: (state) => {
      state.currentPage = ++state.currentPage;
    },

    // Search
    
    clearSearch: (state) => {
      state.heroes = [];
      state.currentPage = 1;
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
      state.windowError.push(action.payload.code);
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
        (state, action: PayloadAction<AllHeroes>) => {
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
  nextPage,
  setWindowSuccess,
  setWindowError,
  deletePopUpInfo,
  loading,
  clearError,
  clearState,
  loadedMarkerTrue,
  loadedMarkerFalse,
  showModal,
} = heroesSlice.actions;

export default heroesSlice.reducer;
