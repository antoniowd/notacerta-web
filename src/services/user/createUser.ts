import {
  User,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import type { AddUserDataDTO, CreateUserDTO } from "./user.types";
import { auth, db, LOGIN_REDIRECT } from "@app/config/firebase";
import AppError from "@app/libs/AppError";
import { doc, setDoc } from "firebase/firestore";

const createUser = async ({ email, password, displayName }: CreateUserDTO) => {
  const fUser = await addUser(email, password);

  await Promise.all([
    updateDisplayname(fUser, displayName),
    vefifyEmail(fUser),
  ]);

  await addUserData({ userId: fUser.uid });
};

export default createUser;

// utils functions
const addUser = async (email: string, password: string) => {
  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return userCredentials.user;
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
};

const updateDisplayname = async (user: User, displayName: string) => {
  try {
    await updateProfile(user, {
      displayName,
    });
  } catch (err) {
    throw new AppError(
      "Internal",
      "Ocorreu um erro ao criar sua conta. Tente novamente mais tarde ou entre em contato conosco.",
    );
  }
};

const vefifyEmail = async (user: User) => {
  try {
    await sendEmailVerification(user, {
      url: LOGIN_REDIRECT,
    });
  } catch (err) {
    throw new AppError(
      "Internal",
      "Ocorreu um erro ao enviar o email de verificação. Tente novamente mais tarde ou entre em contato conosco.",
    );
  }
};

const addUserData = async ({ userId }: AddUserDataDTO) => {
  try {
    await setDoc(doc(db, "userData", userId), {
      defaultCompany: null,
    });
  } catch (err) {
    new AppError(
      "Internal",
      "Ocorreu um erro ao modificar os dados do perfil.",
    );
  }
};
