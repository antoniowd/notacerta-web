import { storage } from "@app/config/firebase";
import AppError from "@app/libs/AppError";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const uploadImage = async (url: string, data: Blob) => {
  try {
    const imageRef = ref(storage, url);
    const snapshot = await uploadBytes(imageRef, data);
    url = await getDownloadURL(snapshot.ref);
    return {
      url,
      snapshot,
    };
  } catch (error) {
    throw new AppError(
      "Internal",
      "Ocorreu um erro ao fazer o upload do objeto",
    );
  }
};

export default uploadImage;
