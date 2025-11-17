import { Router } from "express";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { PreferenceController } from "../controllers";
import { PrismaClient } from "@prisma/client";
import { inputValidateMiddleware } from "../../../middlewares/input-validation-middleware";
import { CreatePreferenceSchema } from "../../../utils/validations/create-preference.validation";
import { UpdatePreferenceSchema } from "../../../utils/validations/update-preference.validation";
import { DeletePreferenceSchema } from "../../../utils/validations/delete-prefence.validation";
import { validateUserMiddleware } from "../../../middlewares/validate-user.middleware";


const router = Router();
const prisma = new PrismaClient();

router.post('/preference', authMiddleware(), validateUserMiddleware(prisma), inputValidateMiddleware(CreatePreferenceSchema), PreferenceController.createPreferences(prisma));
router.put('/preference', authMiddleware(), validateUserMiddleware(prisma), inputValidateMiddleware(UpdatePreferenceSchema), PreferenceController.updatePreferences(prisma));
router.get('/preference/model', PreferenceController.getPreferencesModel());
router.delete('/preference/:name', authMiddleware(), validateUserMiddleware(prisma), inputValidateMiddleware(DeletePreferenceSchema), PreferenceController.deletePreferences(prisma));
router.get('/preference', authMiddleware(), validateUserMiddleware(prisma), PreferenceController.getPreferences(prisma));

export default router;