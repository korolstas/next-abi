import { Card } from "@/components";
import { ErrorMessage } from "@/components";
import { Loader } from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { useDebounce } from "@/hooks/useDebounce";
import { loadedMarkerFalse, setWindowError } from "@/store/heroesSlice";
import { useEffect } from "react";
import styles from "../home/home.module.less";
import { locationHeroes, requestLocation } from "@/store/locationSlice/ActionCreators";

export const Locaited = () => {
  const { localHeroes, isLoading, urlLocation, urlHeroArray } = useAppSelector(
    (state) => state.locationSlice
  );
  const dispatch = useAppDispatch();

  const makeRequest = useDebounce(() => {
    dispatch(locationHeroes(urlLocation));
    dispatch(loadedMarkerFalse());
  }, 1000);

  console.log("urlHeroArray", urlHeroArray);

  useEffect(() => {
    if (urlHeroArray.length) {
      dispatch(requestLocation(urlHeroArray));
    } else {
      dispatch(setWindowError("something went wrong :("));
    }
  }, [urlHeroArray]);

  useEffect(() => {
    makeRequest();
  }, []);

  const allLocalHero = localHeroes.map((hero) => (
    <Card key={hero.id} hero={hero} />
  ));

  return (
    <div className={styles.container}>
      <div className={styles.container_modals}>
        {isLoading ? <Loader /> : allLocalHero} || <ErrorMessage />
      </div>
    </div>
  );
};
