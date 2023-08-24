import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCharacters } from "../../api/req";

export const favoritesLoad = createAsyncThunk(
  "user/favorites-heroes/load",
  async (arr: number[], { rejectWithValue }) => {
    const urlBegin = "/character/";
    try {
      const response = await getCharacters.getLocaitedHeroes(urlBegin, arr);
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.response.data.error);
    }
  }
);
