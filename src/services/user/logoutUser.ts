import { auth } from "@app/config/firebase";
import AppError from "@app/libs/AppError";
import { signOut } from "firebase/auth";

const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    throw new AppError(
      "Internal",
      "Ocorreu um erro ao sair da sua conta. Tente novamente mais tarde ou entre em contato conosco.",
    );
  }
};

export default logoutUser;
