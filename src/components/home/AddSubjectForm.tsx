"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef } from "react";
import { useRouter } from "next/navigation";

type Props = {
  addSubject: (formData: FormData) => Promise<string | undefined>;
};

export default function AddSubjectForm({ addSubject }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  async function formHandler(formData: FormData) {
    const id = await addSubject(formData);
    formRef.current?.reset();
    if (id) {
      router.push(`/${id}`);
      router.refresh();
    }
  }

  return (
    <form ref={formRef} action={formHandler} className="space-y-2">
      <Input type="text" required placeholder="subject..." name="subject" />
      <Button type="submit" className="w-full">
        Add
      </Button>
    </form>
  );
}
