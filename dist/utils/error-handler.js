"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = handleError;
const already_exists_1 = require("./errors/already-exists");
const forbidden_1 = require("./errors/forbidden");
const not_defined_1 = require("./errors/not-defined");
const not_found_1 = require("./errors/not-found");
const unauthorized_1 = require("./errors/unauthorized");
const validation_error_1 = require("./errors/validation-error");
const yup_1 = require("yup");
const logger_1 = require("./logger");
function createErrorResponse(status, type, message) {
    return { status, error: { type, message } };
}
function isBadRequestError(error) {
    if (error instanceof not_defined_1.NotDefined)
        return true;
    if (error instanceof already_exists_1.AlreadyExists)
        return true;
    return false;
}
function parseValidationError(error) {
    const errors = {};
    error.inner.forEach((errorObject) => {
        if (!errorObject.path)
            return;
        errors[errorObject.path] = errorObject.message;
    });
    return errors;
}
function handleError(error) {
    if (error instanceof yup_1.ValidationError) {
        return createErrorResponse(422, "Validation Error", parseValidationError(error));
    }
    if (isBadRequestError(error)) {
        logger_1.logger.warn(error.message);
        return createErrorResponse(400, "Bad Request", error.message);
    }
    if (error instanceof unauthorized_1.Unauthorized) {
        logger_1.logger.warn(error.message);
        return createErrorResponse(401, "Unauthorized", error.message);
    }
    if (error instanceof forbidden_1.Forbidden) {
        logger_1.logger.warn(error.message);
        return createErrorResponse(403, "Forbidden", error.message);
    }
    if (error instanceof not_found_1.NotFound) {
        logger_1.logger.warn(error.message);
        return createErrorResponse(404, "Not Found", error.message);
    }
    if (error instanceof validation_error_1.ValidationError) {
        logger_1.logger.warn(error.message);
        return createErrorResponse(422, "Validation Error", error.message);
    }
    logger_1.logger.error(error.message);
    return createErrorResponse(500, "Server Error", error.message);
}
//# sourceMappingURL=error-handler.js.map