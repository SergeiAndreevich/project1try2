import {Request, Response, Router} from "express";
import {repository} from "../core/repository/data-acsess-layer";
import {httpStatus} from "../core/types/httpStatuses";
import {videosRouter} from "./videos.router";

export const testingRouter = Router({});
testingRouter
    .delete('/all-data', (req: Request, res: Response) => {
        const videos = repository.clearDB();
        res.status(httpStatus.NoContent).send(videos)
    })