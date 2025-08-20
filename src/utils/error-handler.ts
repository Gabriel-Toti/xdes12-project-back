import { AlreadyExists } from './errors/already-exists';
import { Forbidden } from './errors/forbidden';
import { NotDefined } from './errors/not-defined';
import { NotFound } from './errors/not-found';
import { Unauthorized } from './errors/unauthorized';
import { ValidationError } from './errors/validation-error';
import { ValidationError as YupValidationError } from 'yup';
import { logger } from './logger'

function createErrorResponse(status: number, type: string, message: string | Record<string, string>)
{
    return {status, error: { type, message }};
}

function isBadRequestError(error: any) {
    if (error instanceof NotDefined) return true;
    if (error instanceof AlreadyExists) return true;
    return false;
}

function parseValidationError(error: YupValidationError)
{
    const errors: Record<string, string> = {};
    error.inner.forEach((errorObject: any) => {
        if (!errorObject.path) return;
        errors[errorObject.path] = errorObject.message;
    });

    return errors;
}

export function handleError(error: Error)
{
    if(error instanceof YupValidationError)
    {
        return createErrorResponse(422, "Validation Error", parseValidationError(error));
    }

    if (isBadRequestError(error)) {
        logger.warn(error.message);
        return createErrorResponse(400, "Bad Request", error.message);
    }

    if (error instanceof Unauthorized) {
        logger.warn(error.message);
        return createErrorResponse(401, "Unauthorized", error.message);
    }

    if (error instanceof Forbidden) {
        logger.warn(error.message);
        return createErrorResponse(403, "Forbidden", error.message);
    }

    if (error instanceof NotFound) {
        logger.warn(error.message);
        return createErrorResponse(404, "Not Found", error.message);
    }

    if (error instanceof ValidationError) {
        logger.warn(error.message);
        return createErrorResponse(422, "Validation Error", error.message);
    }

    logger.error(error.message);
    return createErrorResponse(500, "Server Error", error.message);
}