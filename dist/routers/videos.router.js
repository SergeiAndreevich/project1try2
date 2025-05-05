"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videosRouter = void 0;
const express_1 = require("express");
const httpStatuses_1 = require("../core/types/httpStatuses");
const data_acsess_layer_1 = require("../core/repository/data-acsess-layer");
const input_video_validation_1 = require("../video/validation/input-video-validation");
const create_error_message_1 = require("../core/utils/create-error-message");
exports.videosRouter = (0, express_1.Router)({});
exports.videosRouter
    .get('', (req, res) => {
    const videos = data_acsess_layer_1.repository.findAllVideos();
    res.status(httpStatuses_1.httpStatus.Ok).send(videos);
})
    .get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const video = data_acsess_layer_1.repository.findVideo(id);
    if (video === null) {
        res.status(httpStatuses_1.httpStatus.NotFound).send('Error message');
        return;
    }
    res.status(httpStatuses_1.httpStatus.Ok).send(video);
    //ты так и не разобрался с датами в формате ISO
})
    .post('', (req, res) => {
    // Request<{}, {}, DriverInputDto>: Request - это тип, импортированный из библиотеки express. <> указывают на использование дженериков (generics), чтобы уточнить типы данных, связанные с запросом.
    // {}: Первый дженерик указывает тип для req.params (параметры маршрута). Пустой объект {} означает, что параметры маршрута не ожидаются (например, /users/:id был бы примером маршрута с параметром id). '' в .post('') также подтверждает, что параметров маршрута нет.
    //
    // {}: Второй дженерик указывает тип для req.query (параметры строки запроса). Пустой объект {} означает, что параметры строки запроса не ожидаются (например, ?name=John&age=30 был бы примером строки запроса).
    //
    // InputVideo: Третий дженерик (самый важный в данном случае!) указывает тип для req.body (тело запроса).
    var _a, _b;
    //errors и проверка валидации
    const errors = (0, input_video_validation_1.validateVideo)(req.body);
    if (errors.length > 0) {
        res.status(httpStatuses_1.httpStatus.BadRequest).send((0, create_error_message_1.createErrorsMessages)(errors));
        return;
    }
    const newVideo = {
        id: new Date().getTime(),
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: (_a = req.body.canBeDownloaded) !== null && _a !== void 0 ? _a : false,
        minAgeRestriction: (_b = req.body.minAgeRestriction) !== null && _b !== void 0 ? _b : 18,
        createdAt: req.body.createdAt || new Date().toISOString(),
        publicationDate: req.body.publicationDate || new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        availableResolutions: req.body.availableResolutions
    };
    data_acsess_layer_1.repository.createVideo(newVideo);
    const video = data_acsess_layer_1.repository.findVideo(newVideo.id);
    res.status(httpStatuses_1.httpStatus.Created).send(video);
})
    .put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const video = data_acsess_layer_1.repository.findVideo(id);
    if (video === null) {
        res.status(httpStatuses_1.httpStatus.NotFound).send('Video not found');
        return;
    }
    //делаем валидацию и затем
    const errors = (0, input_video_validation_1.validateVideo)(req.body);
    if (errors.length > 0) {
        res.status(httpStatuses_1.httpStatus.BadRequest).send((0, create_error_message_1.createErrorsMessages)(errors));
        return;
    }
    data_acsess_layer_1.repository.udpateVideo(video, req.body);
    res.status(httpStatuses_1.httpStatus.NoContent).send('Updated');
})
    .delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = data_acsess_layer_1.repository.findIndex(id);
    if (index === -1) {
        res.status(httpStatuses_1.httpStatus.NotFound).send('Video not found');
        return;
    }
    data_acsess_layer_1.repository.removeVideo(id);
    res.status(httpStatuses_1.httpStatus.NoContent).send('Deleted');
});
