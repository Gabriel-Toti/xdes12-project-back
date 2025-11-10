import { Router } from "express";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { PreferenceController } from "../controllers";
import { PrismaClient } from "@prisma/client";
import { inputValidateMiddleware } from "../../../middlewares/input-validation-middleware";
import { CreatePreferenceSchema } from "../../../utils/validations/create-preference.validation";
import { UpdatePreferenceSchema } from "../../../utils/validations/update-preference.validation";
import { DeletePreferenceSchema } from "../../../utils/validations/delete-prefence.validation";


const router = Router();
const prisma = new PrismaClient();

router.post('/preference', authMiddleware(), inputValidateMiddleware(CreatePreferenceSchema), PreferenceController.createPreferences(prisma));
router.put('/preference', authMiddleware(), inputValidateMiddleware(UpdatePreferenceSchema), PreferenceController.updatePreferences(prisma));
router.get('/preference/model', PreferenceController.getPreferencesModel());
router.delete('/preference/:name', authMiddleware(), inputValidateMiddleware(DeletePreferenceSchema), PreferenceController.deletePreferences(prisma));

export default router;