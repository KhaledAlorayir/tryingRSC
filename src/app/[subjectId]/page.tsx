import { db } from "@/db";
import { Item, Subject } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { z } from "zod";
import DeleteSubjectButton from "@/components/subject/DeleteSubjectButton";
import { revalidatePath } from "next/cache";
import AddItemForm from "@/components/subject/AddItemForm";

type props = {
  params: { subjectId: string };
};

const MAXIMUM_ITEMS_COUNT_ALLOWED = 4;

async function getSubjectWithItems(subjectId: string) {
  const validated = z.string().trim().uuid().parse(subjectId);
  const subject = await db.query.Subject.findFirst({
    where: eq(Subject.id, validated),
    with: { items: true },
  });
  return subject;
}

async function deleteSubject(subjectId: string) {
  "use server";
  const validated = z.string().trim().uuid().parse(subjectId);
  await db.delete(Subject).where(eq(Subject.id, validated));
}

async function addItemToSubject(subjectId: string, item: string) {
  "use server";
  const validatedId = z.string().trim().uuid().parse(subjectId);
  const validatedItem = z.string().trim().min(1).max(255).parse(item);
  const [subjectItemsCount] = await db
    .select({
      itemsCount: sql<number>`count(${Item.id})`,
    })
    .from(Subject)
    .leftJoin(Item, eq(Subject.id, Item.subjectId))
    .where(eq(Subject.id, validatedId));

  if (subjectItemsCount.itemsCount >= MAXIMUM_ITEMS_COUNT_ALLOWED) {
    throw Error("maximum items reached");
  }
  await db.insert(Item).values({ subjectId, content: validatedItem });
  revalidatePath(`/${subjectId}`);
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
          {subject.title} {subject.items.length}
        </h4>
        <DeleteSubjectButton
          deleteSubject={deleteSubject}
          subjectId={subject.id}
        />
      </header>
      <section className="flex-1 border-[1px] border-secondary rounded px-4 py-2">
        <AddItemForm
          addItem={addItemToSubject}
          subjectId={subject.id}
          isDisabled={subject.items.length >= MAXIMUM_ITEMS_COUNT_ALLOWED}
        />
      </section>
    </main>
  );
}
