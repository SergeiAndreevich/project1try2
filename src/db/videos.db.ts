import {Video, VideoResolutions} from "../video/types/Video";

export const videosDB = {
    videos: <Video[]> [
        {
            id: 1,
            title: 'Title',
            author: 'New author',
            canBeDownloaded: true,
            minAgeRestriction: 16,
            createdAt: new Date().toISOString(),
            publicationDate: new Date().toISOString(),
            availableResolutions: [VideoResolutions.P144, VideoResolutions.P240]
        },
        {
            id: 2,
            title: 'Title 2',
            author: 'New author 2',
            canBeDownloaded: false,
            minAgeRestriction: 18,
            createdAt: new Date().toISOString(),
            publicationDate: new Date().toISOString(),
            availableResolutions: [VideoResolutions.P144, VideoResolutions.P240, VideoResolutions.P360]
        }
        ]
}