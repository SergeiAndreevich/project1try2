import express, { Express, Request,Response } from "express";
import {PATH} from "./core/path/path";
import {videosRouter} from "./routers/videos.router";
import {testingRouter} from "./routers/testing.router";

export const setupApp = (app: Express) => {
    app.use(express.json()); // middleware для парсинга JSON в теле запроса

    app.get('/', (req: Request, res: Response) => {
        res.status(200).send(`go to ${PATH.videos}`);
    });

    app.use(PATH.videos, videosRouter);
    app.use(PATH.testing, testingRouter);

    //setupSwagger(app);
    return app;
};