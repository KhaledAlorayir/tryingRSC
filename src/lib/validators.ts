import { z } from "zod";

export const createSubjectSchema = z.string().trim().min(1).max(255);
