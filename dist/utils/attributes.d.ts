import { AttributeData } from "../domain/attributes/interfaces/attributes.interface";
import { EstiloDeConcivenciaValues, FrequenciaDeFestasValues, GeneroColegaDeQuartoValues, HobbiesValues, PetsValues, TipoDeMoradiaValues, UsoDeAlcoolValues } from "./enum/attributes-types.enum";
export declare function isValidAttributeName(attributeName: string): boolean;
export declare function isValidAttribute(attribute: AttributeData): boolean;
export declare function getAttributeConfig(): {
    readonly "Uso de \u00E1lcool": {
        readonly type: "closed";
        readonly expected: UsoDeAlcoolValues[];
    };
    readonly "Frequ\u00EAncia de festas": {
        readonly type: "closed";
        readonly expected: FrequenciaDeFestasValues[];
    };
    readonly "Presen\u00E7a de Pets": {
        readonly type: "closed";
        readonly expected: PetsValues[];
    };
    readonly "Estilo de Conviv\u00EAncia": {
        readonly type: "closed";
        readonly expected: EstiloDeConcivenciaValues[];
    };
    readonly Hobbies: {
        readonly type: "closed";
        readonly expected: HobbiesValues[];
    };
    readonly "Tipo de Moradia": {
        readonly type: "closed";
        readonly expected: TipoDeMoradiaValues[];
    };
    readonly "G\u00EAnero do colega de quarto": {
        readonly type: "closed";
        readonly expected: GeneroColegaDeQuartoValues[];
    };
    readonly Localização: {
        readonly type: "location";
        readonly expected: readonly ["distance_in_km"];
    };
    readonly "Hor\u00E1rios de sil\u00EAncio": {
        readonly type: "schedule";
        readonly expected: readonly ["HHh-HHh; HHh-HHh; ..."];
    };
};
//# sourceMappingURL=attributes.d.ts.map