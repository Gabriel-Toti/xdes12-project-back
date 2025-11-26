"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputValidateMiddleware = inputValidateMiddleware;
const error_handler_1 = require("../utils/error-handler");
function inputValidateMiddleware(schema) {
    return async function (req, res, next) {
        try {
            const input = {
                ...req.body,
                ...req.params,
                ...req.query,
                ...req.headers
            };
            await schema.validate(input, { abortEarly: false });
            next();
        }
        catch (error) {
            const yupError = error;
            const errors = {};
            yupError.inner.forEach((error) => {
                if (!error.path)
                    return;
                errors[error.path] = error.message;
            });
            const responseError = (0, error_handler_1.handleError)(yupError);
            res.status(responseError.status).json(responseError.error);
        }
    };
}
//# sourceMappingURL=input-validation-middleware.js.map