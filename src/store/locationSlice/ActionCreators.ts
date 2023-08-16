import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCharacters } from "../../api/req";

export const locationHeroes = createAsyncThunk(
  "heroes/load/located-arr-numbers",
  async (urlLocation: string, { rejectWithValue }) => {
    try {
      const sizeBegin = urlLocation.indexOf("location");
      const sizeEnd = urlLocation.length;
      const response = await getCharacters.getLocaitedChars(
        urlLocation.substring(sizeBegin, sizeEnd)
      );
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.response.data.error);
    }
  }
);

export const requestLocation = createAsyncThunk(
  "heroes/load/located",
  async (urlHeroArray: string[], { rejectWithValue }) => {
    const newUrl = urlHeroArray.map((element) => {
      const el = element.split("/").filter((item) => item.length);
      return el[el.length - 1] + ",";
    });
    try {
      const response = await getCharacters.getLocaitedChars(
        `/character/${newUrl}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

