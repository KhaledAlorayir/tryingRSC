import Link from "next/link";
import "./globals.css";
import SubjectSection from "@/components/home/SubjectSection";

export const metadata = {
  title: "wildfire",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <main className="h-full py-2 flex flex-col">
          <header>
            <h1 className="font-extrabold text-xl underline">
              <Link href="/">Wildfire</Link>
            </h1>
          </header>
          <section className="flex-1 py-8 flex gap-x-4">
            {/* @ts-ignore */}
            <SubjectSection />
            <div className="bg-secondary w-[2px]"></div>
            <aside className="flex-1">{children}</aside>
          </section>
        </main>
      </body>
    </html>
  );
}
