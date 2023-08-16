import { AllHeroes, Heroes } from "../types/redux-interfaces";
import { instance } from "./config";

const urlBegin = "/character";

export const getCharacters = {
  getChars(page: number, name: string) {
    return instance.get<AllHeroes>(urlBegin, {
      params: { page, name },
    });
  },
  getSortedChars(url: string | null, search: string) {
    if (url) {
      const res = instance.get<AllHeroes>(url);
      return res;
    } else {
      const res = instance.get<AllHeroes>(`${urlBegin}/?page=1&name=${search}`);
      return res;
    }
  },
  getLocaitedChars(url: string) {
    const res = instance.get<Heroes[]>(url);
    return res;
  },
};
