import { Button } from "@/components";
import { headerSing } from "../headerBtns";

interface OpenModal {
  openModal: (item: string) => void;
}

export const UnLoginHeader = ({ openModal }: OpenModal) => {
  return headerSing.map(({ id, info, modalType }) => (
    <Button
      key={id}
      text={info.label}
      variant={"green"}
      onClick={() => openModal(modalType || "")}
    />
  ));
};
