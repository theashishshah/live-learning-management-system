import type { UserTypes } from "../user/user.types.js";
import type { ClassTypes } from "./class.types.js";

/** ClassPolicy
 *  centralized authorization rules for class-related actions.
 * Pure domain logic:
 *
 */

export class ClassPolicy {
    static canCreate(user: UserTypes): boolean {
        return user.role === "teacher";
    }

    static canView(user: UserTypes, classEntity: ClassTypes): boolean {
        if (user.role === "teacher") {
            return classEntity.teacherId === user.id
        }

        if (user.role === "student") {
            return classEntity.status === "LIVE" || classEntity.status === "PUBLISHED"
        }

        return false
    }

    static canEnd(user: User, classEntity: Class): boolean {
        return (
            user.role === "teacher" &&
            classEntity.teacherId === user.id &&
            classEntity.status === "LIVE"
        );
    }

    static canUpdate(user: UserTypes, classEntity: ClassTypes): boolean {
        return (
            user.role === "teacher" && user.id === classEntity.teacherId && classEntity.status !== "ENDED"
        )
    }

    static canDelete(user: UserTypes, classEntity: ClassTypes): boolean {
        return (
            user.role === "teacher" && user.id === classEntity.teacherId && classEntity.status !== "LIVE"
        )
    }

    static canStart(user: UserTypes, classEntity: ClassTypes): boolean {
        return (
            user.role === "teacher". && classEntity.teacherId === user.id && classEntity.status === "PUBLISHED"
        )
    }


    static canPublish(user: UserTypes, classEntity: ClassTypes): boolean {
        return (
            user.role === "teacher" && user.id === classEntity.teacherId &&
            classEntity.status === "DRAFT"
        )
    }


    static canJoin(user: UserTypes, classEntity: ClassTypes): boolean {
        return (
            user.role === "student" && classEntity.status === "LIVE"
        )
    }


    static canLeave(user: UserTypes, classEntity: ClassTypes): boolean {
        return (
            user.role === "student" && ( classEntity.status === "LIVE" || classEntity.status === "ENDED")
        )
    }

}
