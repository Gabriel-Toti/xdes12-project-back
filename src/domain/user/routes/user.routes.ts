import { Router } from "express";
import { UserController } from "../controllers";
import { PrismaClient } from "@prisma/client";
import { inputValidateMiddleware } from "../../../middlewares/input-validation-middleware";
import { CreateUserSchema } from "../../../utils/validations/create-user.validation";
import { LoginSchema } from "../../../utils/validations/login.validation";
import { EditUserSchema } from "../../../utils/validations/update-user.validation";

const router = Router();
const prisma = new PrismaClient();

router.post('/user', inputValidateMiddleware(CreateUserSchema), UserController.createUser(prisma));
router.post('/login', inputValidateMiddleware(LoginSchema), UserController.login(prisma));
router.put('/user/:userId', inputValidateMiddleware(EditUserSchema), UserController.updateUser(prisma));

export default router;