export type UserRoleTypes = "student" | "teacher";
export interface UserTypes {
    id: string;
    email: string;
    role: UserRoleTypes;
    createdAt: Date;
}
