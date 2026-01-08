import type { NextFunction, Request, Response } from "express";
import { addStudentSchema, createClassSchema } from "./class.schema.js";
import { addStudentToClass, createClass } from "./class.service.js";
import { AppError } from "../../src/core/errors/AppError.js";
import { sendFailure, sendResponse } from "../../src/core/api-response/api-responder.js";

export const createClassHandler = async () => {};
export const viewClassHandler = async () => {};
export const endClassHandler = async () => {};
export const updateClassHandler = async () => {};
export const deleteClassHandler = async () => {};
export const startClassHandler = async () => {};
export const publishClassHandler = async () => {};
export const joinClassHandler = async () => {};
export const getClassHandler = async () => {};
export const leaveClassHandler = async () => {};
