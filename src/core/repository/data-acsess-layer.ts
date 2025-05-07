import {videosDB} from "../../db/videos.db";
import {Video} from "../../video/types/Video";
import {UpdateVideo} from "../../video/dto/update-video";

export const repository = {
    findVideo: function (id:number){
        const video = videosDB.videos.find(v => v.id === id);
        if(!video){
            return null
        }
        return video
    },
    findAllVideos: function (){
        return videosDB.videos
    },
    createVideo: function (video:Video){
        videosDB.videos.push(video);
        return
    },
    udpateVideo: function (oldVideo:Video, video:UpdateVideo){
        oldVideo.title = video.title;
        oldVideo.author = video.author;
        oldVideo.canBeDownloaded = video.canBeDownloaded;
        oldVideo.minAgeRestriction = video.minAgeRestriction;
        oldVideo.publicationDate = video.publicationDate;
        oldVideo.availableResolutions = video.availableResolutions;
        return
    },
    findIndex: function (id:number){
        const index = videosDB.videos.findIndex(v=>v.id===id);
        return index
    },
    removeVideo: function (id:number){
        const index = videosDB.videos.findIndex((v) => v.id === id);

        if (index === -1) {
            throw new Error('Video does not exist');
        }

        videosDB.videos.splice(index, 1);
        return

    },
    clearDB: function (){
        return videosDB.videos = [];
    }
}