import { NotFoundBase } from "../notFoundBase.error";

export class InvalidPasswordError extends NotFoundBase {
  constructor(userId: string) {
    super(InvalidPasswordError.name, userId);
    Object.setPrototypeOf(this, InvalidPasswordError.prototype);
  }
}

export class UnauthorizedError extends Error {
  constructor() {
      super(UnauthorizedError.name);
      Object.setPrototypeOf(this, UnauthorizedError.prototype);
      if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UnauthorizedError);
      }
  }
}
