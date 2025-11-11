import { Request, Response, Router } from "express";
import userRouter from './domain/user/routes/user.routes'
import preferencesRouter from "./domain/attributes/routes/preferences.routes"
import propertyRouter from "./domain/property/routers/property.routes"
import rulesRouter from "./domain/attributes/routes/rules.routes"

const router = Router();

//! Placeholder
router.get('/', (_: Request, res: Response) => res.status(200).send('Hello, world!'));

router.use(userRouter);
router.use(preferencesRouter);
router.use(propertyRouter);
router.use(rulesRouter);

export { router };