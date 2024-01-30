import {
  User,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import type { CreateUserDTO } from "./user.types";
import { auth, LOGIN_REDIRECT } from "@app/config/firebase";
import AppError from "@app/libs/AppError";
import { UserModel } from "@app/domain/UserModel";

const createUser = async ({ email, password, displayName }: CreateUserDTO) => {
  let firebaseUser: User | undefined;

  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    firebaseUser = userCredentials.user;
  } catch (err) {
    if (err instanceof FirebaseError) {
      switch (err.code) {
        case "auth/email-already-in-use": {
          throw new AppError(
            "EmailAlreadyExists",
            "O email já existe. Por favor, insira um email diferente ou faça login na sua conta.",
          );
        }
        case "auth/weak-password": {
          throw new AppError(
            "InvalidPassword",
            "A senha não atende aos requisitos para ser uma senha válida.",
          );
        }
      }
    }

    throw new AppError(
      "Internal",
      "Ocorreu um erro ao criar sua conta. Tente novamente mais tarde ou entre em contato conosco.",
    );
  }

  try {
    await updateProfile(firebaseUser, {
      displayName,
    });
  } catch (err) {
    throw new AppError(
      "Internal",
      "Ocorreu um erro ao criar sua conta. Tente novamente mais tarde ou entre em contato conosco.",
    );
  }

  try {
    await sendEmailVerification(firebaseUser, {
      url: LOGIN_REDIRECT,
    });
  } catch (err) {
    throw new AppError(
      "Internal",
      "Ocorreu um erro ao enviar o email de verificação. Tente novamente mais tarde ou entre em contato conosco.",
    );
  }

  return UserModel.createFromFirebase(firebaseUser);
};

export default createUser;
