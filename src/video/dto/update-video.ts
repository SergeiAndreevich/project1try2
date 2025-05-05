import {VideoResolutions} from "../types/Video";

export type UpdateVideo = {
    title: string,
    author: string,
    canBeDownloaded: boolean,
    minAgeRestriction: number,
    publicationDate: string,
    availableResolutions: VideoResolutions[]
}