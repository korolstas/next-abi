import { setUser } from "@/store/heroesSlice";

export const imageHandle = ([file]: any, dispatch: any) => {
  // replace any with appropriate types
  if (!file) return;

  debugger;
  const reader = new FileReader();
  reader.onload = ({ target }) => {
    const image = target?.result || null;
    image && dispatch(setUser({ image }));
  };

  reader.readAsDataURL(file);
};
