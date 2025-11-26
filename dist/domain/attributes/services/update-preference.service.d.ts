import { PrismaClient } from "@prisma/client";
import { UpdatePreferencePayload } from "../interfaces/preferences.interface";
export declare function updatePreferenceService(userId: string, name: string, preferencePayload: UpdatePreferencePayload, prisma: PrismaClient): Promise<void>;
//# sourceMappingURL=update-preference.service.d.ts.map