import { AppError } from "../../src/core/errors/AppError.js";
import type { ClassDocument } from "./class.model.js";

/**
 * Ensure the given user owns the class
 * Pure domain level rule: No Express, No HTTP
 */

export function assertClassOwnership(classEntity: ClassDocument, userId: string): void {
    if (classEntity.teacherId.toString() !== userId) {
        throw new AppError("FORBIDDEN", 403, "You don't have permission");
    }
}
