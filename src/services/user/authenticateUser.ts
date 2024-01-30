import { signInWithEmailAndPassword } from "firebase/auth";
import { AuthenticateUserDTO } from "./user.types";
import { auth } from "@app/config/firebase";
import AppError from "@app/libs/AppError";
import { FirebaseError } from "firebase/app";

const authenticateUser = async ({ email, password }: AuthenticateUserDTO) => {
  try {
    const firebaseUser = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return firebaseUser.user;
  } catch (err) {
    if (err instanceof FirebaseError) {
      switch (err.code) {
        case "auth/invalid-credential": {
          throw new AppError(
            "InvalidCredentials",
            "Email ou senha incorretos. Por favor, tente novamente.",
          );
        }
      }
    }
    throw new AppError(
      "Internal",
      "Ocorreu um erro ao entrar na sua conta. Tente novamente mais tarde ou entre em contato conosco.",
    );
  }
};

export default authenticateUser;
