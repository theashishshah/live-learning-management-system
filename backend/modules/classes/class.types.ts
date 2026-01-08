export type ClassStatusTypes = "DRAFT" | "LIVE" | "PUBLISHED" | "ENDED";

export interface ClassTypes {
    id: string;
    teacherId: string;
    status: ClassStatus;
}
