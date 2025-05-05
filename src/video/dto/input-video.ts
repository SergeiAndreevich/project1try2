import {VideoResolutions} from "../types/Video";

export type InputVideo = {
    title: string,
    author: string,
    canBeDownloaded?: boolean,
    minAgeRestriction?: number,
    createdAt?: string,
    publicationDate?: string,
    availableResolutions: VideoResolutions[]
}