import { ScrollArea } from "@/components/ui/scroll-area";
import { db } from "@/db";
import { Subject } from "@/db/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";
import { createSubjectSchema } from "@/lib/validators";
import AddSubjectForm from "./AddSubjectForm";

async function getSubjects() {
  const subjects = await db
    .select()
    .from(Subject)
    .orderBy(desc(Subject.createdAt));
  return subjects;
}

async function addSubject(formData: FormData) {
  "use server";
  const validated = createSubjectSchema.safeParse(
    formData.get("subject")?.toString()
  );

  if (!validated.success) return;

  const [inserted] = await db
    .insert(Subject)
    .values({ title: validated.data })
    .returning();
  return inserted.id;
}

export default async function SubjectSection() {
  const subjects = await getSubjects();

  return (
    <aside className="w-2/5 flex flex-col gap-y-6 md:w-1/4">
      <AddSubjectForm addSubject={addSubject} />
      <ScrollArea className="flex-grow h-0">
        <ul className="list-disc list-inside break-all space-y-2">
          {subjects.map((subject) => (
            <li
              key={subject.id}
              className="hover:underline underline-offset-1 text-lg font-semibold transition-all"
            >
              <Link href={`/${subject.id}`}>{subject.title}</Link>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </aside>
  );
}
