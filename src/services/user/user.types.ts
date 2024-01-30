export type CreateUserDTO = {
  email: string;
  password: string;
  displayName: string;
};

export type AuthenticateUserDTO = Omit<CreateUserDTO, "displayName">;
