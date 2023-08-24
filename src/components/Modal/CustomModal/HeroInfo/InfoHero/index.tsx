import { Heroes } from "@/types/redux-interfaces";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { clearState, showModal } from "@/store/heroesSlice";
import styles from "./info.module.less";
import { router_page } from "@/pages/routers-pages";
import { useRouter } from "next/router";
import { postLocation } from "@/store/locationSlice";

export const InfoHeroParams = ({ hero }: { hero: Heroes }) => {
  const router = useRouter();
  const modalsInfo = [
    {
      label: "Gender: ",
      value: hero.gender,
    },
    {
      label: "Species: ",
      value: hero.species,
    },
    {
      label: "Status: ",
      value: hero.status,
    },
    {
      label: "Location: ",
      value: hero.location.name,
    },
  ];
  const dispatch = useAppDispatch();

  const linkToLocation = () => {
    dispatch(showModal({ visible: "heroModal" }));
    dispatch(postLocation(hero.location.url));
    dispatch(clearState());
    router.push(router_page.location_to);
  };

  return (
    <>
      <div className={styles.box_name}>{hero.name}</div>

      {modalsInfo &&
        modalsInfo.map((modalInfo) => (
          <div className={styles.text} key={modalInfo.label}>
            <b className={styles.text}>{modalInfo.label}</b>
            {modalInfo.label
              .toLowerCase()
              .substring(0, modalInfo.label.length - 2) === "location" ? (
              modalInfo.value !== "unknown" ? (
                <label onClick={() => linkToLocation()} className={styles.link}>
                  {modalInfo.value}
                </label>
              ) : (
                modalInfo.value
              )
            ) : (
              modalInfo.value
            )}
          </div>
        ))}
    </>
  );
};
