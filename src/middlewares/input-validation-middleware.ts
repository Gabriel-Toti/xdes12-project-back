import { NextFunction, Request, Response } from "express";
import { AnySchema, ValidationError } from "yup";
import { handleError } from "../utils/error-handler";

export function inputValidateMiddleware(schema: AnySchema)
{
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            const input = {
                ...req.body,
                ...req.params,
                ...req.query,
                ...req.headers
            };
            await schema.validate(input, { abortEarly: false });
            
            next();
        } catch (error: any) {
            const yupError = error as ValidationError;
            const errors: Record<string, string> = {};

            yupError.inner.forEach((error) => {
                if(!error.path) return;
                errors[error.path] = error.message;
            });

            const responseError = handleError(yupError);

            res.status(responseError.status).json(responseError.error);
        }
    }
}