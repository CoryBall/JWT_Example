import { User } from "../users";
import UserService from '../users/user.service'
import { Inject, Service } from "typedi";
import * as argon2 from 'argon2';
import { sign, verify} from 'jsonwebtoken';
import { DecodedToken } from "./models";
import { InvalidPasswordError, UnauthorizedError } from "./auth.errors";
import {Request} from 'express';

@Service()
export default class AuthService {
    @Inject()
    private readonly userService: UserService;

    private readonly JWT_SECRET: string = "this_is_a_very_good_secret";

    async login(username: string, password: string): Promise<string> {
        const user = this.userService.getByUsername(username);

        var passwordIsValid = await this.validatePassword(user, password);

        if (passwordIsValid){
            return this.signToken(user);
        }
        throw new InvalidPasswordError(user.id);
    }

    /**
     * Given a user, we will create a signed JWT that will expire in one hour from creation date
     * @param user User we're creating the token for
     * @returns Bearer token signed with user info for client to use
     */
    signToken(user: User): string {
        const oneHour = 60 * 60 * 1000;

        const encryptedUser: DecodedToken = {
            userId: user.id,
            username: user.username,
        };

        const accessToken: string = sign(
            encryptedUser,
            this.JWT_SECRET,
            {
                expiresIn: oneHour
            }
        )

        return accessToken;
    }

    /**
     * 
     * @param token Bearer Token
     * @returns If able to verify, returns user info
     */
    validateToken(token: string): DecodedToken {
        try {
            return verify(token, this.JWT_SECRET) as DecodedToken;
        } catch (e) {
            return null;
        }
    }

    getUserIdFromRequest(req: Request): string {
        const token = this.getBearerFromRequest(req);
        return this.validateToken(token).userId;
    }


    private getBearerFromRequest(req: Request): string {
        const bearerHeaderValue: string = req.headers['authorization'].toString().replace('Bearer ', '');
        if (!bearerHeaderValue || bearerHeaderValue.length === 0) {
            throw new UnauthorizedError();
        }
        return bearerHeaderValue;
    }

    private  async validatePassword(user: User, password: string): Promise<boolean> {
        try {
            return await argon2.verify(user.passwordHash, password);
        } catch (e) {
            return false;
        }
    }
}