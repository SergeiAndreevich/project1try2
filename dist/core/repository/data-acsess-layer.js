"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repository = void 0;
const videos_db_1 = require("../../db/videos.db");
exports.repository = {
    findVideo: function (id) {
        const video = videos_db_1.videosDB.videos.find(v => v.id === id);
        if (!video) {
            return null;
        }
        return video;
    },
    findAllVideos: function () {
        return videos_db_1.videosDB.videos;
    },
    createVideo: function (video) {
        videos_db_1.videosDB.videos.push(video);
        return;
    },
    udpateVideo: function (oldVideo, video) {
        oldVideo.title = video.title;
        oldVideo.author = video.author;
        oldVideo.canBeDownloaded = video.canBeDownloaded;
        oldVideo.minAgeRestriction = video.minAgeRestriction;
        oldVideo.publicationDate = video.publicationDate;
        oldVideo.availableResolutions = video.availableResolutions;
        return;
    },
    findIndex: function (id) {
        const index = videos_db_1.videosDB.videos.findIndex(v => v.id === id);
        return index;
    },
    removeVideo: function (id) {
        const index = videos_db_1.videosDB.videos.findIndex((v) => v.id === id);
        if (index === -1) {
            throw new Error('Video does not exist');
        }
        videos_db_1.videosDB.videos.splice(index, 1);
        return;
    },
    clearDB: function () {
        return videos_db_1.videosDB.videos = [];
    }
};
