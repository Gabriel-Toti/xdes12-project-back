export interface CreateAnnouncementData {
    title: string;
    description?: string;
    average_cost: number;
    boost?: boolean;
    vacancies: number;
    id_property: string;
}
export interface UpdateAnnouncementData {
    title?: string;
    description?: string;
    average_cost?: number;
    boost?: boolean;
    vacancies?: number;
}
//# sourceMappingURL=announcement.interface.d.ts.map