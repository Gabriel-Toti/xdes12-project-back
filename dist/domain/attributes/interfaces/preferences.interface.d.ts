export interface CreatePreferencePayload {
    name: string;
    weight: number;
    value: string;
}
export interface UpdatePreferencePayload {
    value: string;
    weight?: number;
}
export interface UpdatePreferenceData {
    id: string;
    value: string;
    weight?: number;
}
//# sourceMappingURL=preferences.interface.d.ts.map