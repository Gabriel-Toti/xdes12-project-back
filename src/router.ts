import { Request, Response, Router } from "express";
import userRouter from './domain/user/routes/user.routes'
import preferencesRouter from "./domain/attributes/routes/preferences.routes"
import propertyRouter from "./domain/property/routers/property.routes"
import rulesRouter from "./domain/attributes/routes/rules.routes"
import announcementRouter from "./domain/announcement/routes/announcement.routes"
import matchesRouter from "./domain/matches/routes/matches.routes"
import paymentRouter from "./domain/payment/routes/payment.routes"

const router = Router();

//! Placeholder
router.get('/', (_: Request, res: Response) => res.status(200).send('Hello, world!'));

router.use(userRouter);
router.use(preferencesRouter);
router.use(propertyRouter);
router.use(rulesRouter);
router.use(announcementRouter);
router.use(matchesRouter);
router.use(paymentRouter);

export { router };