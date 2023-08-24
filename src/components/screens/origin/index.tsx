import { Card } from "@components";
import { ErrorMessage } from "@components";
import { Loader } from "@components";
import { useAppDispatch, useAppSelector } from "@hooks/redux-hooks";
import { useEffect, useState } from "react";
import styles from "../home/home.module.less";
import { locationHeroes, requestLocation } from "@store/location/actions";
import { Heroes } from "@store/heroes";
import { useDebounce } from "@hooks/useDebounce";

export const Origin = () => {
  const { localHeroes, isLoading, urlLocation, urlHeroArray, error } =
    useAppSelector((state) => state.locationReducer);
  const { search } = useAppSelector((state) => state.heroesReducer);
  const dispatch = useAppDispatch();

  const [sortHeroes, setSortHeroes] = useState<Heroes[]>([]);

  const makeSort = useDebounce(() => {
    setSortHeroes(
      localHeroes.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, 1000);

  const fetchData = () => dispatch(locationHeroes(urlLocation));

  useEffect(() => {
    makeSort();
  }, [search]);

  useEffect(() => {
    if (urlHeroArray?.length) dispatch(requestLocation(urlHeroArray));
  }, [urlHeroArray]);

  useEffect(() => {
    fetchData();
  }, []);

  const getLocaited = () => {
    if (isLoading) return <Loader />;

    if (error) return <ErrorMessage />;

    if (search)
      return sortHeroes.map((hero) => <Card key={hero.id} hero={hero} />);

    return localHeroes.map((hero) => <Card key={hero.id} hero={hero} />);
  };

  return (
    <div className={styles.container}>
      <div className={styles.container_modals}>{getLocaited()}</div>
    </div>
  );
};
