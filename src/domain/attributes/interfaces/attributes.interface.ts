
export interface AttributeData {
    name: string;
    value: string; // Precisa de uma conversão de tipos para sempre ser uma string
}

export interface CreateAttributePayload {
    name: string,
    weight: number,
    value: string
}
