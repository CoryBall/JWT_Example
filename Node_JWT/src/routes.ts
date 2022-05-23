import * as express from "express";
import {Router} from "express";
import Container from "typedi";
import { AuthController } from "./auth";
import { UserController } from "./users";

function getRouter(): Router {
    const router = express.Router();

    // to clean things up a bit, we're using typedi for dependency injection. It is similar to dotnet
    const userController = Container.get(UserController);
    const authController = Container.get(AuthController);

    // get user info from JWT token in header
    router.get("/api/users/me", async (req, res) => {
        const response = await userController.me(req, res);
        return res.send(response);
    });

    // create new user
    router.post("/api/users/register", async (req, res) => {
        const response = await userController.register(req, res);
        return res.send(response);
    });

    // log in with user
    router.post("/api/login", async (req, res) => {
        const response = await authController.login(req, res);
        return res.send(response);
    })

    return router;
}

export default getRouter;