import mongoose, { Model, Schema, Types } from "mongoose";
import type { ClassSessionStatusTypes } from "./class.types.js";

export type ClassSessionDocument = {
    classId: Types.ObjectId; // mongodb _id
    status: ClassSessionStatusTypes;
    startedAt?: Date;
    endedAt?: Date;
    activeTeacherSocketId: string; // socket id: which is string
    activeStudentsSocketId: string[];
    createdAt: Date;
    updatedAt: Date;
};

const classSessionSchema = new Schema(
    {
        classId: {
            type: Types.ObjectId,
            ref: "Class",
            required: true,
        },
        status: {
            type: String,
            enum: ["LIVE", "IDLE", "ENDED"],
            default: "IDLE",
        },
        startedAt: Date,
        endedAt: Date,
        activeTeacherSocketId: {
            type: String,
            default: null
        },
        activeStudentsSocketId: [
            {
                type: String,
            },
        ],
    },
    { timestamps: true }
);

classSessionSchema.index({ classId: 1, status: 1})

export const ClassSession: Model<ClassSessionDocument> =
    mongoose.models.ClassSession ||
    mongoose.model<ClassSessionDocument>("ClassSession", classSessionSchema);
