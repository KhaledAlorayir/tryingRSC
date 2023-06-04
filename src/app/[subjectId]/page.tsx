import { db } from "@/db";
import { Subject } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

type props = {
  params: { subjectId: string };
};

async function getSubjectWithItems(subjectId: string) {
  const validated = z.string().trim().uuid().parse(subjectId);
  const subject = await db.query.Subject.findFirst({
    where: eq(Subject.id, validated),
    with: { items: true },
  });
  return subject;
}

async function deleteSubject(formData: FormData) {
  "use server";
  const validated = z.string().trim().uuid().parse(formData.get("subjectId"));
  await db.delete(Subject).where(eq(Subject.id, validated));
  revalidatePath("/");
  redirect("/");
}

export default async function SubjectPage({ params }: props) {
  const subject = await getSubjectWithItems(params.subjectId);

  if (!subject) {
    return <main className="flex justify-center items-center">404</main>;
  }

  return (
    <main className="py-4 h-full flex flex-col gap-y-4">
      <header className="flex justify-between">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          {subject.title}
        </h4>
        <form action={deleteSubject}>
          <input type="hidden" name="subjectId" value={subject.id} />
          <Button variant="destructive">Delete Subject</Button>
        </form>
      </header>
      <section className="flex-1 border-[1px] border-secondary rounded px-4 py-2">
        <form className="flex flex-col md:flex-row">
          <Input type="text" required placeholder="item..." name="item" />
          <Button type="submit" className="md:w-24">
            Add
          </Button>
        </form>
      </section>
    </main>
  );
}
