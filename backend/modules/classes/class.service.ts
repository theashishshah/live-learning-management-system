import { createClassHandler } from "./class.controller.js";
import { Class } from "./class.model.js";
import { Types } from "mongoose";
import type { CreateClassInput } from "./class.schema.js";

export const createClass = async (className: string, teacherId: string) => {
    const res = await Class.create({
        className,
        teacherId: new Types.ObjectId(teacherId),
        enrolledStudentIds: [],
    });

    return res;
};

export const addStudentToClass = async (classId: string, teacherId: string, studentId: string) => {
    const cls = await Class.findOne({
        _id: new Object(classId),
        teacherId: new Object(teacherId),
    });

    if (!cls) return null;

    if (!cls.enrolledStudentIds.includes(new Types.ObjectId(studentId))) {
        cls.enrolledStudentIds.push(new Types.ObjectId(studentId));
        await cls.save();
    }

    return cls;
};

export const endClassHandler = async () => {};
