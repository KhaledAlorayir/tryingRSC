"use server";
import { db } from "@/db";
import { Subject } from "@/db/schema";

import { createSubjectSchema } from "./validators";
import { revalidatePath } from "next/cache";

export async function addSubject(formData: FormData) {
  const validated = createSubjectSchema.parse(
    formData.get("subject")?.toString()
  );
  await db.insert(Subject).values({ title: validated });
  revalidatePath("/");
}
