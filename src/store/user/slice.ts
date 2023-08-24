import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Heroes } from "@store/heroes";
import { favoritesLoad } from "./actions";
import { UserState } from "./types";

const initialState: UserState = {
  id: undefined,
  isUser: false,
  isFavorite: false,
  isLoading: false,
  name: "",
  image: undefined,
  arrFavoriteHeroes: [],
  favoriteHeroes: [],
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => {},
    setUser: (state, { payload }) => {
      state.isUser = true;
      if (payload.id) {
        state.id = payload.id;
      }
      if (payload.name) {
        state.name = payload.name;
      }
      if (payload.image) {
        state.image = payload.image;
      }
    },
    loadFavoritesHeroes: (state, { payload }) => {
      state.arrFavoriteHeroes = payload.favorites;
    },
    addFavoriteHero: (state, { payload }) => {
      state.arrFavoriteHeroes = state.arrFavoriteHeroes.concat(payload.id);
      state.favoriteHeroes = state.favoriteHeroes.concat(payload);
    },
    onClickBtnFavorite: (state, { payload }) => {
      state.isFavorite = payload;
    },
    deleteFavorite: (state, { payload }) => {
      const index = state.arrFavoriteHeroes.indexOf(payload);
      state.arrFavoriteHeroes.splice(index, 1);
      if (state.favoriteHeroes.length !== 0) {
        state.favoriteHeroes = state.favoriteHeroes.filter((hero) => {
          return payload !== hero.id;
        });
      }
    },
    clearPage: (state) => {
      state.isFavorite = false;
      state.favoriteHeroes = [];
    },
    exit: (state) => {
      state.id = undefined;
      state.isUser = false;
      state.isFavorite = false;
      state.name = "";
      state.image = undefined;
      state.arrFavoriteHeroes = [];
      state.favoriteHeroes = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(favoritesLoad.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        favoritesLoad.fulfilled,
        (state, action: PayloadAction<Heroes[]>) => {
          const result = action.payload;
          state.favoriteHeroes = [...result];
          state.isLoading = false;
          state.error = null;
        }
      )
      .addCase(favoritesLoad.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      });
  },
});

export const {
  setUser,
  loadFavoritesHeroes,
  addFavoriteHero,
  onClickBtnFavorite,
  deleteFavorite,
  clearPage,
  exit,
} = userSlice.actions;

export const userReducer = userSlice.reducer;
