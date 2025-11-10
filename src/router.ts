import { Request, Response, Router } from "express";
import userRouter from './domain/user/routes/user.routes'
import preferencesRouter from "./domain/attributes/routes/preferences.routes"

const router = Router();

//! Placeholder
router.get('/', (_: Request, res: Response) => res.status(200).send('Hello, world!'));

router.use(userRouter);
router.use(preferencesRouter);

export { router };