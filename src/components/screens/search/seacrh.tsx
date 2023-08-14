import { useEffect } from "react";
import styles from "../home/home.module.less";
import { useDebounce } from "../../../hooks/useDebounce";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hooks";
import { soartedHeroes } from "../../../store/appSlice/ActionCreators";
import {
  loadedMarkerTrue,
  loadedMarkerFalse,
} from "../../../store/appSlice/appSlice";
import Loader from "@/components/Loader/Loader";
import { HeroesList } from "@/components/HeroesList/HeroesList";

const Search = () => {
  const dispatch = useAppDispatch();
  const { search, isLoadedData, isLoading, nextPageSort } = useAppSelector(
    (state) => state.appSlice
  );

  const makeRequest = useDebounce(() => {
    if (search.length && isLoadedData && nextPageSort !== null) {
      dispatch(soartedHeroes({ nextPageSort, search }));
      dispatch(loadedMarkerFalse());
    }
  }, 1000);

  const isScrollHandler = () => {
    const isScroll =
      document.documentElement.scrollHeight -
        (document.documentElement.scrollTop + window.innerHeight) <
      1;
    if (isScroll) {
      dispatch(loadedMarkerTrue());
    }
  };

  useEffect(() => {
    makeRequest();
  }, [isLoadedData]);

  useEffect(() => {
    document.addEventListener("scroll", isScrollHandler);
    return function () {
      document.removeEventListener("scroll", isScrollHandler);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.container_modals}>
        {isLoading ? <Loader /> : <HeroesList />}
      </div>
    </div>
  );
};

export default Search;
