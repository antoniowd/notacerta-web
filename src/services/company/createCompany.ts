import { CreateCompanyDTO } from "./company.types";
import { functions } from "@app/config/firebase";
import AppError from "@app/libs/AppError";
import { httpsCallable } from "firebase/functions";

const createCompany = async ({
  businessName,
  businessId,
  logoUrl,
  state,
}: CreateCompanyDTO) => {
  try {
    const fn = httpsCallable(functions, "createCompany");
    const result = await fn({
      businessName,
      businessId,
      logoUrl,
      state,
    });

    console.log(result);
  } catch (err) {
    new AppError("Internal", "Ocorreu um erro ao criar a empresa.");
  }
};

export default createCompany;
