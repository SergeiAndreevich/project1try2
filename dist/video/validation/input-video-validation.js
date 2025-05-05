"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateVideo = void 0;
const Video_1 = require("../types/Video");
const validateVideo = (inputVideo) => {
    const errors = [];
    if (!inputVideo.title ||
        typeof inputVideo.title !== 'string' ||
        inputVideo.title.trim().length < 1 ||
        inputVideo.title.trim().length > 40) {
        errors.push({ field: 'title', message: 'Invalid title' });
    }
    if (!inputVideo.author ||
        typeof inputVideo.author !== 'string' ||
        inputVideo.author.trim().length < 1 ||
        inputVideo.author.trim().length > 20) {
        errors.push({ field: 'author', message: 'Invalid author' });
    }
    if (inputVideo.canBeDownloaded !== undefined &&
        typeof inputVideo.canBeDownloaded !== "boolean") {
        errors.push({ field: 'can be downloaded', message: 'Invalid field' });
    }
    if (inputVideo.minAgeRestriction !== undefined &&
        typeof inputVideo.canBeDownloaded !== "number" ||
        inputVideo.minAgeRestriction !== undefined &&
            !Number.isInteger(inputVideo.minAgeRestriction) ||
        inputVideo.minAgeRestriction !== undefined &&
            inputVideo.minAgeRestriction < 0 ||
        inputVideo.minAgeRestriction !== undefined &&
            inputVideo.minAgeRestriction > 100) {
        errors.push({ field: 'min age restriction', message: 'Invalid age' });
    }
    if (inputVideo.createdAt && typeof inputVideo.createdAt !== 'string') {
        errors.push({ field: 'created at', message: 'Invalid date of creation' });
    }
    if (inputVideo.publicationDate && typeof inputVideo.publicationDate !== 'string') {
        errors.push({ field: 'publication date', message: 'Invalid date of publication' });
    }
    if (!Array.isArray(inputVideo.availableResolutions) ||
        inputVideo.availableResolutions.length === 0) {
        errors.push({ field: 'video resolutions', message: 'Invalid video resolution' });
    }
    if (inputVideo.availableResolutions.length !== 0) {
        const allowedResolutions = [Video_1.VideoResolutions.P144, Video_1.VideoResolutions.P240, Video_1.VideoResolutions.P360, Video_1.VideoResolutions.P480];
        inputVideo.availableResolutions.forEach(resolution => {
            if (!allowedResolutions.includes(resolution)) {
                errors.push({ field: 'video resolutions', message: 'Invalid video resolution' });
            }
        });
    }
    return errors;
};
exports.validateVideo = validateVideo;
