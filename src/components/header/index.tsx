import styles from "./header.module.less";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import {
  addSearch,
  clearSearch,
  clearState,
  loading,
  showModal,
} from "@/store/heroesSlice";
import { useRouter } from "next/router";
import { router_page } from "@/pages/routers-pages";
import { useEffect, useState } from "react";
import { UnLoginHeader } from "./UnLoginHeader";
import { LoginHeader } from "./LoginHeader";
import { useDebounce } from "@/hooks/useDebounce";

export const Header = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.heroesSlice);
  const { isUser } = useAppSelector((state) => state.userSlice);
  const [searchValue, setSearchValue] = useState<string>();
  const router = useRouter();
  const logo_name = "Rick and Morty";

  const openModal = (modalType: string) => {
    dispatch(showModal({ modalType }));
  };

  const goToHome = () => {
    dispatch(clearState());
    router.push(router_page.home_to);
  };

  const makeRequest = useDebounce(() => {
    dispatch(addSearch(searchValue));
  }, 1000);

  useEffect(() => {
    makeRequest();
  }, [searchValue]);

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(target.value);

    if (!isLoading) {
      dispatch(clearSearch());
      dispatch(loading());
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.container_logo}>
          <div onClick={goToHome} className={styles.container_logo_link}>
            <div className={styles.container_logo_link_decor}>{logo_name}</div>
          </div>
        </div>
        <div className={styles.container_search_box}>
          <input
            onChange={handleChange}
            type="text"
            placeholder="Search character ..."
            className={styles.container_search_box_input}
            value={searchValue}
          />
        </div>
        <div className={styles.container_btns}>
          {isUser ? (
            <LoginHeader openModal={openModal} />
          ) : (
            <UnLoginHeader openModal={openModal} />
          )}
        </div>
      </div>
    </>
  );
};
