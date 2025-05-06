"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupApp = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = require("./core/path/path");
const videos_router_1 = require("./routers/videos.router");
const testing_router_1 = require("./routers/testing.router");
const setupApp = (app) => {
    app.use(express_1.default.json()); // middleware для парсинга JSON в теле запроса
    app.get('/', (req, res) => {
        res.status(200).send(`go to ${path_1.PATH.videos}`);
    });
    app.use(path_1.PATH.videos, videos_router_1.videosRouter);
    app.use(path_1.PATH.testing, testing_router_1.testingRouter);
    //setupSwagger(app);
    return app;
};
exports.setupApp = setupApp;
