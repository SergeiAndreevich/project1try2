"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateVideo = void 0;
const Video_1 = require("../types/Video");
const validateVideo = (inputVideo) => {
    const errors = [];
    // is title correct?
    if (!inputVideo.title ||
        typeof inputVideo.title !== 'string' ||
        inputVideo.title.trim().length < 1 ||
        inputVideo.title.trim().length > 40) {
        errors.push({ field: 'title', message: 'Invalid title' });
    }
    // is author correct?
    if (!inputVideo.author ||
        typeof inputVideo.author !== 'string' ||
        inputVideo.author.trim().length < 1 ||
        inputVideo.author.trim().length > 20) {
        errors.push({ field: 'author', message: 'Invalid author' });
    }
    // can be downloaded?
    if (inputVideo.canBeDownloaded !== undefined &&
        typeof inputVideo.canBeDownloaded !== "boolean") {
        errors.push({ field: 'can be downloaded', message: 'Invalid field' });
    }
    // is there min age restriction? is it correct?
    if (inputVideo.minAgeRestriction !== undefined &&
        typeof inputVideo.minAgeRestriction !== "number" ||
        inputVideo.minAgeRestriction !== undefined &&
            !Number.isInteger(inputVideo.minAgeRestriction) ||
        inputVideo.minAgeRestriction !== undefined &&
            inputVideo.minAgeRestriction < 0 ||
        inputVideo.minAgeRestriction !== undefined &&
            inputVideo.minAgeRestriction > 100) {
        errors.push({ field: 'min age restriction', message: 'Invalid age' });
    }
    // created at
    if (inputVideo.createdAt && typeof inputVideo.createdAt !== 'string') {
        errors.push({ field: 'created at', message: 'Invalid date of creation' });
    }
    // publication date
    if (inputVideo.publicationDate && typeof inputVideo.publicationDate !== 'string') {
        errors.push({ field: 'publication date', message: 'Invalid date of publication' });
    }
    // are available resolutions correct?
    if (!Array.isArray(inputVideo.availableResolutions) ||
        inputVideo.availableResolutions.length === 0 || inputVideo.availableResolutions.length > 8) {
        errors.push({ field: 'video resolutions', message: 'Invalid video resolution' });
    }
    if (inputVideo.availableResolutions.length !== 0) {
        const allowedResolutions = [Video_1.VideoResolutions.P144, Video_1.VideoResolutions.P240, Video_1.VideoResolutions.P360,
            Video_1.VideoResolutions.P480, Video_1.VideoResolutions.P720, Video_1.VideoResolutions.P1080, Video_1.VideoResolutions.P1440, Video_1.VideoResolutions.P2160];
        //проверяем, не вносили ли дубликатов
        if ((new Set(inputVideo.availableResolutions)).size !== inputVideo.availableResolutions.length) {
            errors.push({ field: 'video resolutions', message: 'no duplicates please' });
        }
        //проверяем на совпадение с допустимыми форматами
        inputVideo.availableResolutions.forEach(resolution => {
            if (!allowedResolutions.includes(resolution)) {
                errors.push({ field: 'video resolutions', message: 'Invalid video resolution' });
            }
        });
    }
    return errors;
};
exports.validateVideo = validateVideo;
