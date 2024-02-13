import { addDoc, collection } from "firebase/firestore";
import { db } from "@app/config/firebase";
import AppError from "@app/libs/AppError";

const updateProfile = async ({
  businessName,
  businessId,
  logoUrl,
  state,
}: CreateCompanyDTO) => {
  try {
    const docRef = await addDoc(collection(db, "companies"), {
      businessName,
      businessId,
      logoUrl,
      state,
    });
    return docRef.id;
  } catch (err) {
    new AppError("Internal", "Ocorreu um erro ao criar a empresa.");
  }
};

export default updateProfile;
