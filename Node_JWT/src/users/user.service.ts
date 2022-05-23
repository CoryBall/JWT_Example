import { Service } from "typedi";
import { User } from "./models";
import { UserNotFoundByIdError, UserNotFoundByUsernameError } from "./user.errors";
import * as argon2 from 'argon2';
import { v4 as uuid} from 'uuid';

@Service()
export default class UserService {
    private static _users: User[];

    constructor() {
        if (!UserService._users) UserService._users = [];
    }

    getById(id: string): User {
        const user = UserService._users.find(x => x.id === id);
        if (!user) throw new UserNotFoundByIdError(id);
        return user;
    }

    getByUsername(username: string): User {
        const user = UserService._users.find(x => x.username === username);
        if (!user) throw new UserNotFoundByUsernameError(username);
        return user;
    }

    async register(username: string, firstName: string, lastName: string, password: string): Promise<User> {
        const passwordHash = await argon2.hash(password);
        const newUser = {
            id: uuid(),
            username,
            firstName,
            lastName,
            passwordHash
        } as User;
        UserService._users.push(newUser)
        return newUser;
    }
}