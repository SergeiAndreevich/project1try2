"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videosDB = void 0;
const Video_1 = require("../video/types/Video");
exports.videosDB = {
    videos: [
        {
            id: 1,
            title: 'Title',
            author: 'New author',
            canBeDownloaded: true,
            minAgeRestriction: 16,
            createdAt: new Date().toISOString(),
            publicationDate: new Date().toISOString(),
            availableResolutions: [Video_1.VideoResolutions.P144, Video_1.VideoResolutions.P240]
        },
        {
            id: 2,
            title: 'Title 2',
            author: 'New author 2',
            canBeDownloaded: false,
            minAgeRestriction: 18,
            createdAt: new Date().toISOString(),
            publicationDate: new Date().toISOString(),
            availableResolutions: [Video_1.VideoResolutions.P144, Video_1.VideoResolutions.P240, Video_1.VideoResolutions.P360]
        }
    ]
};
