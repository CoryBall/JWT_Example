import { Inject, Service } from "typedi";
import { CreateUserDto, UserDto } from "./models";
import {Request, Response} from 'express';
import UserService from "./user.service";
import { AuthService } from "../auth";

@Service()
export default class UserController {
    @Inject()
    private readonly authService: AuthService;
    @Inject()
    private readonly userService: UserService;

    async me(req: Request, res: Response): Promise<UserDto> {
        /*
            General flow of using a JWT to retrieve user info:
            1. Get JWT value from request header
            2. Decode JWT to get payload data
            3. Use payload data (in this case userId) to retrieve user info
            4. Use user info however needed
        */
        try {
            const userId = this.authService.getUserIdFromRequest(req);
            const user = this.userService.getById(userId);
            return {
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
            } as UserDto
        } catch(e) {
            console.error(e);
            res.status(401);
        }

    }

    async register(req: Request, res: Response): Promise<UserDto> {
        /*
            Very basic, just pushing a new user object to our list of users.
            Users will be emptied when server stops or restarts
        */
        try {
            const input = req.body as CreateUserDto;
            const user = await this.userService.register(input.username, input.firstName, input.lastName, input.password);
            return {
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
            } as UserDto
        } catch(e) {
            res.status(401);
        }
    }
}