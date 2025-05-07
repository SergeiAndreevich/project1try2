import {ValidationError} from "../types/validationErrors";

// export function createErrorsMessages(errors: ValidationError[]):{errorMessages:ValidationError[]} => {
//     return {errorsMessages: errors};
// }
export const createErrorsMessages = (
    errors: ValidationError[],
): { errorsMessages: ValidationError[] } => {
    return { errorsMessages: errors };
};