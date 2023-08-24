import { useEffect, useState } from "react";
import styles from "./card.module.less";
import { showModal } from "@/store/heroesSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { Heroes } from "@/types/redux-interfaces";
import noneHeart from "@/../public/img/none_heart.png";
import heart from "@/../public/img/heart.png";
import Image from "next/image";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/../firebase";
import { addFavoriteHero, deleteFavorite } from "@/store/userSlice";

export const Card = ({ hero }: { hero: Heroes }) => {
  const dispatch = useAppDispatch();
  const [isClick, setIsClick] = useState<boolean>(false);
  const { isUser, arrFavoriteHeroes, id } = useAppSelector(
    (state) => state.userSlice
  );
  const showModalWithHeroData = (hero: Heroes) => {
    dispatch(showModal({ hero, modalType: "heroModal" }));
  };

  const loadArrIntoWeb = async () => {
    try {
      await setDoc(doc(db, "user", `${id}`), {
        favorites: arrFavoriteHeroes,
      });
    } catch (error: any) {}
  };

  const addFavorite = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    e.stopPropagation();
    if (isClick) {
      dispatch(deleteFavorite(hero.id));
    } else {
      dispatch(addFavoriteHero(hero));
    }
    setIsClick(!isClick);
    loadArrIntoWeb();
  };

  useEffect(() => {
    const isFavoriteHero = arrFavoriteHeroes.some((item: number) => {
      return item === hero.id;
    });
    setIsClick(isFavoriteHero);
  }, [arrFavoriteHeroes]);

  return (
    <>
      {isUser && (
        <Image
          width={32}
          height={32}
          className={styles.card_heart}
          onClick={addFavorite}
          src={isClick ? heart : noneHeart}
          alt=""
        />
      )}
      <div  onClick={() => showModalWithHeroData(hero)} className={styles.card_info}>
        <h2>{hero.name}</h2>
        <div className={styles.card_info_img}>
          <Image src={hero.image} width={200} height={200} alt="" />
        </div>
      </div>
    </>
  );
};
