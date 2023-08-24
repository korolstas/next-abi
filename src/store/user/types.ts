import { Heroes } from "@store/heroes";

export interface UserState {
  id: string | undefined;
  isUser: boolean;
  isFavorite: boolean;
  isLoading: boolean;
  name: string;
  image: string | undefined;
  arrFavoriteHeroes: number[];
  favoriteHeroes: Heroes[];
  error: string | null;
}
