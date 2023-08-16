import { showModal } from "@/store/heroesSlice";
import { InfoHeroParams } from "./InfoHero";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import styles from "./heroModal.module.less";
import { Button } from "@/components";

export const HeroModal = () => {
  const dispatch = useAppDispatch();
  const { modalData } = useAppSelector((state) => state.heroesSlice);

  return (
    <div className={styles.box}>
      <Button
        text="x"
        onClick={() => dispatch(showModal({ visible: "heroModal" }))}
        variant={"cancel"}
      />
      <div className={styles.box_info}>
        <img src={modalData.image} alt="" />
        <div className={styles.box_info_modal}>
          <InfoHeroParams hero={modalData} />
        </div>
      </div>
    </div>
  );
};
