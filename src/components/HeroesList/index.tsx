import { useAppSelector } from "@/hooks/redux-hooks";
import { Card } from "../Card";

export const HeroesList = () => {
  const { heroes, search, sortHeroes } = useAppSelector(
    (state) => state.heroesSlice
  );
  const renderHeroes = search.length !== 0 ? sortHeroes : heroes;

  return (
    <>
      {renderHeroes.map((hero) => (
        <Card key={hero.id} hero={hero} />
      ))}
    </>
  );
};
