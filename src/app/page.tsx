import SubjectSection from "@/components/home/SubjectSection";

export default async function Home() {
  return (
    <main className="h-screen py-2 flex flex-col">
      <header>
        <h1 className="font-extrabold text-xl">
          <a href="/">Wildfire</a>
        </h1>
      </header>
      <section className="flex-1 py-8 flex gap-x-4">
        {/* @ts-ignore */}
        <SubjectSection />
        <div className="bg-secondary w-[2px]"></div>
        <aside className="flex-1">b</aside>
      </section>
    </main>
  );
}
