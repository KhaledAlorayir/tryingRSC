import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { db } from "@/db";
import { Subject } from "@/db/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";
import { createSubjectSchema } from "@/lib/validators";
import { revalidatePath } from "next/cache";

async function getSubjects() {
  const subjects = await db
    .select()
    .from(Subject)
    .orderBy(desc(Subject.createdAt));
  return subjects;
}

async function addSubject(formData: FormData) {
  "use server";
  const validated = createSubjectSchema.parse(
    formData.get("subject")?.toString()
  );
  await db.insert(Subject).values({ title: validated });
  revalidatePath("/");
}

export default async function SubjectSection() {
  const subjects = await getSubjects();

  return (
    <aside className="w-2/5 flex flex-col gap-y-6 md:w-1/4">
      <form action={addSubject} className="space-y-2">
        <Input type="text" required placeholder="subject..." name="subject" />
        <Button type="submit" className="w-full">
          Add
        </Button>
      </form>
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
