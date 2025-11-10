import { AttributeData } from "../domain/attributes/interfaces/attributes.interface";
import { EstiloDeConcivenciaValues, FrequenciaDeFestasValues, GeneroColegaDeQuartoValues, HobbiesValues, PetsValues, TipoDeMoradiaValues, UsoDeAlcoolValues,  } from "./enum/attributes-types.enum";

const asArray = <T extends Record<string, string>>(obj: T) =>
  Object.values(obj) as Array<T[keyof T]>;

const ATTRIBUTE_CONFIG = {
  "Uso de álcool": {
    type: "closed",
    expected: asArray(UsoDeAlcoolValues)
  },

  "Frequência de festas": {
    type: "closed",
    expected: asArray(FrequenciaDeFestasValues)
  },

  "Presença de Pets": {
    type: "closed",
    expected: asArray(PetsValues)
  },

  "Estilo de Convivência": {
    type: "closed",
    expected: asArray(EstiloDeConcivenciaValues)
  },

  "Hobbies": {
    type: "closed",
    expected: asArray(HobbiesValues)
  },

  "Tipo de Moradia": {
    type: "closed",
    expected: asArray(TipoDeMoradiaValues)
  },

  "Gênero do colega de quarto": {
    type: "closed",
    expected: asArray(GeneroColegaDeQuartoValues)
  },

  // NOVOS — não são enums
  "Localização": {
    type: "location",         // campo aberto
    expected: ["distance_in_km"]
  },

  "Horários de silêncio": {
    type: "schedule",         // campo de intervalo
    expected: ["HHh-HHh; HHh-HHh; ..."]
  }
} as const;

type AllowedAttributeName = keyof typeof ATTRIBUTE_CONFIG;

export function isValidAttributeName(attributeName: string): boolean {
    return attributeName in ATTRIBUTE_CONFIG;
}

export function isValidAttribute(attribute: AttributeData): boolean {

  if (!(attribute.name in ATTRIBUTE_CONFIG)) {
    return false;
  }

  const attributeValues = attribute.value.split(", ");
  const allowedValues = ATTRIBUTE_CONFIG[attribute.name as AllowedAttributeName] as {type: string, expected: any};

  if(allowedValues.type === 'location')
  {
    return !isNaN(Number(attribute.value));
  }

  if (allowedValues.type === "schedule") {
    return /^(?:([01]\d|2[0-3])h-([01]\d|2[0-3])h)(?:;\s?([01]\d|2[0-3])h-([01]\d|2[0-3])h)*$/.test(attribute.value);
  }

  if(attributeValues.length === 1)
  {
    return allowedValues.expected.includes(attributeValues[0]!)
  }

  return attributeValues.every((value) => allowedValues.expected.includes(value));
}

export function getAttributeConfig()
{
  return ATTRIBUTE_CONFIG;
}