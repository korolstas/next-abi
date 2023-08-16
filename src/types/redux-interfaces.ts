export interface Heroes {
  id: number;
  name: string;
  gender: string;
  status: string;
  location: {
    name: string;
    url: string;
  };
  image: string;
  species: string;
  isEqual: boolean;
  isFavorite: boolean;
}

export interface AllHeroes {
  info: {
    // next: string;
    pages: number;
  };
  results: Heroes[];
  residents: string[];
}
