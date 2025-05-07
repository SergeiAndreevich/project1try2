import {InputVideo} from "../dto/input-video";
import {ValidationError} from "../../core/types/validationErrors";
import {VideoResolutions} from "../types/Video";



export const validateVideo = (inputVideo:InputVideo): ValidationError[] => {
    const errors: ValidationError[] = [];
    // is title correct?
    if (
        !inputVideo.title ||
        typeof inputVideo.title !== 'string' ||
        inputVideo.title.trim().length < 1 ||
        inputVideo.title.trim().length > 40
    ) {
        errors.push({ field: 'title', message: 'Invalid title' })
    }
    // is author correct?
    if (
        !inputVideo.author ||
        typeof inputVideo.author !== 'string' ||
        inputVideo.author.trim().length < 1 ||
        inputVideo.author.trim().length > 20
    ) {
        errors.push({ field: 'author', message: 'Invalid author' })
    }
    // can be downloaded?
    if (
        inputVideo.canBeDownloaded !== undefined &&
        typeof inputVideo.canBeDownloaded !== "boolean"
    ) {
        errors.push({ field: 'canBeDownloaded', message: 'Invalid field' })
    }
    // is there min age restriction? is it correct?
    if (
        inputVideo.minAgeRestriction !== undefined &&
        typeof inputVideo.minAgeRestriction !== "number" ||
        inputVideo.minAgeRestriction !== undefined &&
        !Number.isInteger(inputVideo.minAgeRestriction) ||
        inputVideo.minAgeRestriction !== undefined &&
        inputVideo.minAgeRestriction < 0 ||
        inputVideo.minAgeRestriction !== undefined &&
        inputVideo.minAgeRestriction > 100
    ) {
        errors.push({ field: 'minAgeRestriction', message: 'Invalid age' })
    }
    // created at
    if (inputVideo.createdAt && typeof inputVideo.createdAt !== 'string'
    ){
        errors.push({ field: 'createdAt', message: 'Invalid date of creation' })
    }
    // publication date
    if (inputVideo.publicationDate && typeof inputVideo.publicationDate !== 'string'
    ){
        errors.push({ field: 'publicationDate', message: 'Invalid date of publication' })
    }
    // are available resolutions correct?
    if(
        !Array.isArray(inputVideo.availableResolutions) ||
        inputVideo.availableResolutions.length === 0 || inputVideo.availableResolutions.length > 8
    ){
        errors.push({ field: 'availableResolutions', message: 'Invalid video resolution' })
    }
    if (inputVideo.availableResolutions.length !== 0){
        const allowedResolutions = [VideoResolutions.P144,VideoResolutions.P240,VideoResolutions.P360,
            VideoResolutions.P480, VideoResolutions.P720,VideoResolutions.P1080,VideoResolutions.P1440,VideoResolutions.P2160];
        //проверяем, не вносили ли дубликатов
        if((new Set(inputVideo.availableResolutions)).size !== inputVideo.availableResolutions.length){
            errors.push({field:'availableResolutions', message:'no duplicates please'})
        }
        //проверяем на совпадение с допустимыми форматами
        inputVideo.availableResolutions.forEach(resolution => {
            if (!allowedResolutions.includes(resolution)) {
                errors.push({ field: 'availableResolutions', message: 'Invalid video resolution' })
            }
        })
    }
    return errors
}