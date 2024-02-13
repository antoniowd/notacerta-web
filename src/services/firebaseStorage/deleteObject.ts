import { ref, deleteObject as fDeleteObject } from "firebase/storage";
import { storage } from "@app/config/firebase";
import AppError from "@app/libs/AppError";

const deleteObject = async (url: string) => {
  try {
    const imageRef = ref(storage, url);
    await fDeleteObject(imageRef);
  } catch (error) {
    throw new AppError("Internal", "Ocorreu um erro ao excluir o objeto");
  }
};

export default deleteObject;
