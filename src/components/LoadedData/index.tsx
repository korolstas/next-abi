import { useCallback, useEffect, useRef } from "react";
import style from "../Card/card.module.less";
import styles from "../screens/home/home.module.less";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { nextPage } from "@/store/heroesSlice";

interface Props<T> {
  data: T[];
  isLoading: boolean;
  renderItem: (item: T) => JSX.Element;
  fetchMore: (page: number) => void;
}

export const LoadedData = <T,>({
  data,
  isLoading,
  renderItem,
  fetchMore,
}: Props<T>) => {
  const {search, currentPage, hasMore, endPage } = useAppSelector(
    (state) => state.heroesSlice
  );

  const observer: React.MutableRefObject<any> = useRef();
  const dispatch = useAppDispatch();

  const lastElementRef = useCallback(
    (node: any) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          if (currentPage < endPage) dispatch(nextPage());
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  useEffect(() => {
    fetchMore(currentPage);
  }, [search, currentPage]);

  const getHeroes = () => {
    return data.map((item, index) => {
      if (data.length === index + 1)
        return (
          <div className={style.card} key={index} ref={lastElementRef}>
            {renderItem(item)}
          </div>
        );
      return (
        <div className={style.card} key={index}>
          {renderItem(item)}
        </div>
      );
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.container_modals}>{getHeroes()}</div>
    </div>
  );
};
