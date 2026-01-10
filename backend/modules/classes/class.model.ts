import mongoose, { Schema, Types } from "mongoose";
import type { ClassStatusTypes } from "./class.types.js";

export interface ClassDocument {
    _id: Types.ObjectId;
    className: string;
    teacherId: Types.ObjectId;
    enrolledStudentIds: Types.ObjectId[];
    capacity: number;
    status: ClassStatusTypes;
    createdAt: Date;
    updatedAt: Date;
    startedAt?: Date;
    endedAt?: Date;
}

const classSchema = new Schema<ClassDocument>(
    {
        className: {
            type: String,
            required: true,
            trim: true,
            maxLength: 100,
        },
        teacherId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        enrolledStudentIds: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        capacity: {
            type: Number,
            required: true,
            min: 0,
            defalut: 0, // unlimited
        },
        status: {
            type: String,
            enum: ["LIVE", "DRAFT", "ENDED", "PUBLISHED", "CANCELED"],
            default: "DRAFT",
            index: true,
        },
        endedAt: {
            type: Date,
        },
    },
    { timestamps: true }
);

export const Class = mongoose.model<ClassDocument>("Class", classSchema);
