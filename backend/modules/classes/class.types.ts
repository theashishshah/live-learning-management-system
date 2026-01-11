export type ClassStatusTypes = "DRAFT" | "LIVE" | "PUBLISHED" | "ENDED" | "CANCELED";

export interface ClassTypes {
    id: string;
    teacherId: string;
    status: ClassStatusTypes;
}
