import { Router } from "express";
import { UserController } from "../controllers";
import { PrismaClient } from "@prisma/client";
import { inputValidateMiddleware } from "../../../middlewares/input-validation-middleware";
import { CreateUserSchema } from "../../../utils/validations/create-user.validation";
import { LoginSchema } from "../../../utils/validations/login.validation";
import { EditUserSchema } from "../../../utils/validations/update-user.validation";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { validateUserMiddleware } from "../../../middlewares/validate-user.middleware";

const router = Router();
const prisma = new PrismaClient();

router.post('/user', inputValidateMiddleware(CreateUserSchema), UserController.createUser(prisma));
router.post('/login', inputValidateMiddleware(LoginSchema), UserController.login(prisma));
router.post('/logout', UserController.logout(prisma));
router.put('/user', authMiddleware(), inputValidateMiddleware(EditUserSchema), validateUserMiddleware(prisma), UserController.updateUser(prisma));
router.delete('/user', authMiddleware(), inputValidateMiddleware(EditUserSchema), validateUserMiddleware(prisma), UserController.deleteUser(prisma));
router.get('/me', authMiddleware(), validateUserMiddleware(prisma), UserController.getMe(prisma));

export default router;