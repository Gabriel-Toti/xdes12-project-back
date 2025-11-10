import { Router } from "express";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { PreferenceController } from "../controllers";
import { PrismaClient } from "@prisma/client";
import { inputValidateMiddleware } from "../../../middlewares/input-validation-middleware";
import { CreatePreferenceSchema } from "../../../utils/validations/create-preference.validation";


const router = Router();
const prisma = new PrismaClient();

router.post('/preference', authMiddleware(), inputValidateMiddleware(CreatePreferenceSchema), PreferenceController.createPreferences(prisma));
router.get('/preference/model', PreferenceController.getPreferencesModel())

export default router;