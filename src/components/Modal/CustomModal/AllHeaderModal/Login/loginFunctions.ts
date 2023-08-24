import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { app, db } from "@/../firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { doc, getDoc } from "firebase/firestore";
import { loading, setWindowError, setWindowSuccess } from "@/store/heroesSlice";
import { imageHandle } from "@/helpers";
import { loadFavoritesHeroes, setUser } from "@/store/userSlice";

export const SignUpFuction = async (
  data: any,
  closeModal: () => void,
  dispatch: any
) => {
  const auth = getAuth(app);

  createUserWithEmailAndPassword(auth, data.singUpEmail, data.singUpPassword)
    .then(({ user }) => {
      imageHandle(data.singUpImage, dispatch);
      updateProfile(user, {
        displayName: data.singUpName,
      })
        .then(() => {
          dispatch(
            setUser({
              id: user.uid,
              name: user.displayName,
            })
          );
        })
        .catch((error) => {
          dispatch(setWindowError(error));
        });

      const storage = getStorage();
      const storageRef = ref(storage, `${user.uid}.jpg`);
      uploadBytes(storageRef, data.singUpImage[0])
        .then((snapshot) => {
          dispatch(setWindowSuccess("Perfect Img"));
        })
        .catch((error) => {
          dispatch(setWindowError(error));
        });
      closeModal();
      dispatch(loading());
      dispatch(setWindowSuccess("Success sing up"));
    })
    .catch((error) => {
      dispatch(setWindowError(error));
    });
};

export const SignInFuction = async (
  data: any,
  closeModal: () => void,
  dispatch: any
) => {
  const auth = getAuth(app);

  const getInfo = async (id: string) => {
    const docRef = doc(db, "user", id);
    const docSnap = await getDoc(docRef);
    dispatch(loadFavoritesHeroes(docSnap.data()));
  };

  signInWithEmailAndPassword(auth, data.singInEmail, data.singInPassword)
    .then(({ user }) => {
      const storage = getStorage();
      getDownloadURL(ref(storage, `${user.uid}.jpg`)).then((url) => {
        dispatch(setUser({ id: user.uid, name: user.displayName, image: url }));
      });
      getInfo(user.uid);
      closeModal();
      dispatch(loading());
      dispatch(setWindowSuccess("Success sign in"));
    })
    .catch((error) => {
      dispatch(setWindowError(error));
    });
};
