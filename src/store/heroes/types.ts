export interface HeroesState {
  //Modal
  modalType: string;
  modalData: Heroes | null;
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

export interface Heroes {
  id: number;
  name: string;
  gender: string;
  status: string;
  location: {
    name: string;
    url: string;
  };
  origin: {
    name: string;
    url: string;
  };
  episode: string[];
  image: string;
  species: string;
  isEqual: boolean;
  isFavorite: boolean;
}

export interface AllHeroes {
  info: {
    pages: number;
  };
  results: Heroes[];
  residents: string[];
}