import {ValidationError} from "../types/validationErrors";

export function createErrorsMessages(errors: ValidationError[]){
    return {errorsMsg: errors}
}