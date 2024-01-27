export type ErrorCodes = "Internal" | "EmailAlreadyExists" | "InvalidPassword";

export default class AppError extends Error {
  code: string;
  constructor(code: ErrorCodes, message: string) {
    super(message);
    this.code = code;
    this.name = "AppError";
  }
}
