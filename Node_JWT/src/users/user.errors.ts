import { NotFoundBase } from "../notFoundBase.error";

export class UserNotFoundByIdError extends NotFoundBase {
  constructor(id: string) {
    super(UserNotFoundByIdError.name, id);
    Object.setPrototypeOf(this, UserNotFoundByIdError.prototype);
  }
}

export class UserNotFoundByUsernameError extends NotFoundBase {
  constructor(username: string) {
    super(UserNotFoundByUsernameError.name, username, 'username');
    Object.setPrototypeOf(this, UserNotFoundByUsernameError.prototype);
  }
}
