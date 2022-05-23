import "reflect-metadata";
import * as express from "express";
import * as morgan from "morgan";
import * as bodyParser from "body-parser";
import getRouter from "./routes";

(async () => {
    // server setup
    const PORT = process.env.APP_PORT || 4000;
    const app = express();
    const router = getRouter();

    // bodyParser helps with getting data from the request body
    app.use(bodyParser.json());
    // morgan is a logging middleware that will output information in console while running
    app.use(morgan("tiny"));
    app.use(express.static("public"));

    // create endpoints
    app.use(router);

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
})();