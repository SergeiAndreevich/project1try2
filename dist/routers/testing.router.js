"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testingRouter = void 0;
const express_1 = require("express");
const data_acsess_layer_1 = require("../core/repository/data-acsess-layer");
const httpStatuses_1 = require("../core/types/httpStatuses");
exports.testingRouter = (0, express_1.Router)({});
exports.testingRouter
    .delete('/all-data', (req, res) => {
    const videos = data_acsess_layer_1.repository.clearDB();
    res.status(httpStatuses_1.httpStatus.NoContent).send(videos);
});
