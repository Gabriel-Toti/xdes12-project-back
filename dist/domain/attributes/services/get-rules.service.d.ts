import { PrismaClient } from "@prisma/client";
export declare function getRulesService(propertyId: string, prisma: PrismaClient): Promise<({
    attribute: {
        id: string;
        name: string;
        value: string;
    };
} & {
    id_attributes: string;
    id_property: string;
})[]>;
//# sourceMappingURL=get-rules.service.d.ts.map