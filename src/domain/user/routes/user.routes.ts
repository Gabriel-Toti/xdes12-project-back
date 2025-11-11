import { Router } from "express";
import { UserController } from "../controllers";
import { PrismaClient } from "@prisma/client";
import { inputValidateMiddleware } from "../../../middlewares/input-validation-middleware";
import { CreateUserSchema } from "../../../utils/validations/create-user.validation";
import { LoginSchema } from "../../../utils/validations/login.validation";
import { EditUserSchema } from "../../../utils/validations/update-user.validation";
import { authMiddleware } from "../../../middlewares/auth.middleware";

const router = Router();
const prisma = new PrismaClient();

router.post('/user', inputValidateMiddleware(CreateUserSchema), UserController.createUser(prisma));
router.post('/login', inputValidateMiddleware(LoginSchema), UserController.login(prisma));
router.put('/user', authMiddleware(), inputValidateMiddleware(EditUserSchema), UserController.updateUser(prisma));
router.get('/me', authMiddleware(), UserController.getUser(prisma));
router.delete('/user', authMiddleware(), inputValidateMiddleware(EditUserSchema), UserController.deleteUser(prisma));

export default router;