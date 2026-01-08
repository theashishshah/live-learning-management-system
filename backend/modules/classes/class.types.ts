export type ClassStatus = "DRAFT" | "LIVE" | "PUBLISHED" | "ENDED";

export interface Class {
    id: string;
    teacherId: string;
    status: ClassStatus;
}
