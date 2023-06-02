import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { addSubject } from "@/lib/actions";
import { db } from "@/db";
import { Subject } from "@/db/schema";
import { desc } from "drizzle-orm";

async function getSubjects() {
  const subjects = await db
    .select()
    .from(Subject)
    .orderBy(desc(Subject.createdAt));
  return subjects;
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
            <li key={subject.id}>{subject.title}</li>
          ))}
        </ul>
      </ScrollArea>
    </aside>
  );
}
