import { PrismaClient } from "@prisma/client";
import { CreatePreferencePayload } from "../interfaces/preferences.interface";
export declare function createPreferencesService(userId: string, preferencePayload: CreatePreferencePayload[], prisma: PrismaClient): Promise<void>;
//# sourceMappingURL=create-preference.service.d.ts.map