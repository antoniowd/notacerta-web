import AppError from "@app/libs/AppError";
import { UpdateCompanyDTO } from "./company.types";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@app/config/firebase";

const updateCompany = async ({
  id,
  businessId,
  businessName,
  logoUrl,
  state,
}: UpdateCompanyDTO) => {
  try {
    const companyRef = doc(db, "companies", id);

    await updateDoc(companyRef, {
      businessId,
      businessName,
      logoUrl: logoUrl || null,
      state,
    });
  } catch (err: any) {
    throw new AppError("Internal", err.message);
  }
};

export default updateCompany;
