import { NextFunction, Request, Response } from "express";
import { AnySchema } from "yup";
export declare function inputValidateMiddleware(schema: AnySchema): (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=input-validation-middleware.d.ts.map