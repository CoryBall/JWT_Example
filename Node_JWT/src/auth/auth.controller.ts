import { Request, Response } from "express";
import { Inject, Service } from "typedi";
import { AuthService } from ".";
import { CredentialsDTO, LoginResponseDto } from "./models";

@Service()
export default class AuthController {
    @Inject()
    private readonly authService: AuthService;

    async login(req: Request, res: Response): Promise<LoginResponseDto> {
        /*
            General flow of creating a JWT on login:
            1. Verify user credentials
            2. Get user from username and create JWT
            3. Send JWT back for them to use in next request
        */
        try {
            const credentials = req.body as CredentialsDTO;
            const bearerToken = await this.authService.login(credentials.username, credentials.password);
            return {
                bearerToken
            }
        } catch(e) {
            console.error(e);
            res.status(401);
        }
        
    }
}