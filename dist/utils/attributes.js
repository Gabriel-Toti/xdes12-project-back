"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidAttributeName = isValidAttributeName;
exports.isValidAttribute = isValidAttribute;
exports.getAttributeConfig = getAttributeConfig;
const attributes_types_enum_1 = require("./enum/attributes-types.enum");
const asArray = (obj) => Object.values(obj);
const ATTRIBUTE_CONFIG = {
    "Uso de álcool": {
        type: "closed",
        expected: asArray(attributes_types_enum_1.UsoDeAlcoolValues)
    },
    "Frequência de festas": {
        type: "closed",
        expected: asArray(attributes_types_enum_1.FrequenciaDeFestasValues)
    },
    "Presença de Pets": {
        type: "closed",
        expected: asArray(attributes_types_enum_1.PetsValues)
    },
    "Estilo de Convivência": {
        type: "closed",
        expected: asArray(attributes_types_enum_1.EstiloDeConcivenciaValues)
    },
    "Hobbies": {
        type: "closed",
        expected: asArray(attributes_types_enum_1.HobbiesValues)
    },
    "Tipo de Moradia": {
        type: "closed",
        expected: asArray(attributes_types_enum_1.TipoDeMoradiaValues)
    },
    "Gênero do colega de quarto": {
        type: "closed",
        expected: asArray(attributes_types_enum_1.GeneroColegaDeQuartoValues)
    },
    // NOVOS — não são enums
    "Localização": {
        type: "location", // campo aberto
        expected: ["distance_in_km"]
    },
    "Horários de silêncio": {
        type: "schedule", // campo de intervalo
        expected: ["HHh-HHh; HHh-HHh; ..."]
    }
};
function isValidAttributeName(attributeName) {
    return attributeName in ATTRIBUTE_CONFIG;
}
function isValidAttribute(attribute) {
    if (!isValidAttributeName(attribute.name)) {
        return false;
    }
    const attributeValues = attribute.value.split(", ");
    const allowedValues = ATTRIBUTE_CONFIG[attribute.name];
    if (allowedValues.type === 'location') {
        return !isNaN(Number(attribute.value));
    }
    if (allowedValues.type === "schedule") {
        return /^(?:([01]\d|2[0-3])h-([01]\d|2[0-3])h)(?:;\s?([01]\d|2[0-3])h-([01]\d|2[0-3])h)*$/.test(attribute.value);
    }
    if (attributeValues.length === 1) {
        return allowedValues.expected.includes(attributeValues[0]);
    }
    return attributeValues.every((value) => allowedValues.expected.includes(value));
}
function getAttributeConfig() {
    return ATTRIBUTE_CONFIG;
}
//# sourceMappingURL=attributes.js.map