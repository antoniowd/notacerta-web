import { User } from "firebase/auth";

type UserModelOptions = {
  id: string;
  email: string | null;
  fullName: string | null;
  emailVerified?: boolean;
  avatarUrl?: string | null;
};

export class UserModel {
  id: string;
  email: string | null;
  fullName: string | null;
  emailVerfified?: boolean;
  avatarUrl?: string | null;

  constructor({
    id,
    email,
    fullName,
    emailVerified,
    avatarUrl,
  }: UserModelOptions) {
    this.id = id;
    this.email = email;
    this.fullName = fullName;
    this.emailVerfified = emailVerified;
    this.avatarUrl = avatarUrl;
  }

  static createFromFirebase(firebaseUser: User): UserModel {
    return new UserModel({
      id: firebaseUser.uid,
      email: firebaseUser.email,
      fullName: firebaseUser.displayName,
      emailVerified: firebaseUser.emailVerified,
      avatarUrl: firebaseUser.photoURL,
    });
  }
}
