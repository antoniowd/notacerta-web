import { UserModel } from "@app/domain/UserModel";
import { atom } from "jotai";

export const userModel = atom<UserModel | null>(null);
