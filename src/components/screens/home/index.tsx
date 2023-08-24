import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { loadHeroes } from "@/store/heroesSlice/ActionCreators";
import { Card, ErrorMessage, Loader } from "@/components";
import { LoadedData } from "@components/LoadedData";

export const Home = () => {
  const dispatch = useAppDispatch();
  const { error, search, heroes, isLoading } = useAppSelector(
    (state) => state.heroesSlice
  );

  const fetchData = (page: number) => dispatch(loadHeroes({ page, search }));

  return (
    <>
      <LoadedData
        data={heroes}
        isLoading={isLoading}
        fetchMore={(nextPage) => fetchData(nextPage)}
        renderItem={(item) => <Card hero={item} />}
      />
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
    </>
  );
};
