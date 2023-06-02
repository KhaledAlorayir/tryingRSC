import { db } from "@/db";

export default async function Home() {
  const subjects = await db.query.Subject.findMany();
  return (
    <main className="text-red-500 text-center">
      hello world {subjects.length}
    </main>
  );
}
