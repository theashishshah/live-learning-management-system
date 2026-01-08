export type UserRole = "student" | "teacher";

export interface User {
    _id: string;
    email: string;
    role: UserRole;
    createdAt: Date;
}
