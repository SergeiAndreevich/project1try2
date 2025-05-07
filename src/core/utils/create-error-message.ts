import {ValidationError} from "../types/validationErrors";

export function createErrorsMessages(errors: ValidationError[]){
    return {errorsMessages: errors}
}