import { Prisma, PrismaClient } from "@prisma/client";
import { AttributeData } from "../interfaces/attributes.interface";
export declare function createRules(propertyId: string, ruleData: AttributeData[], prisma: PrismaClient): Promise<void>;
export declare function getPropertyRules(propertyId: string, prisma: PrismaClient): Prisma.PrismaPromise<{
    id_attributes: string;
    id_property: string;
}[]>;
export declare function propertyRulesExists(propertyId: string, names: string[], prisma: PrismaClient): Promise<{
    id_attributes: string;
    id_property: string;
}[]>;
//# sourceMappingURL=rules.repository.d.ts.map