import { Request, Response, Router } from "express";

const router = Router();

//! Placeholder
router.get('/', (_: Request, res: Response) => res.status(200).send('Hello, world!'));

export { router };