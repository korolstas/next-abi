import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCharacters } from "../../api/req";

export const favoritesLoad = createAsyncThunk(
  "user/favorites-heroes/load",
  async (url: number[], { rejectWithValue }) => {
    try {
      const response = await getCharacters.getLocaitedChars(
        `/character/${url}`
      );
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.response.data.error);
    }
  }
);
