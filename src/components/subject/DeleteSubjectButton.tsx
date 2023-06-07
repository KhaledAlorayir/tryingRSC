"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type Props = {
  deleteSubject: (subjectId: string) => Promise<void>;
  subjectId: string;
};

export default function DeleteSubjectButton({
  deleteSubject,
  subjectId,
}: Props) {
  const router = useRouter();

  async function deleteHandler() {
    await deleteSubject(subjectId);
    router.refresh();
    router.push("/");
  }

  return (
    <Button variant="destructive" onClick={deleteHandler}>
      Delete Subject
    </Button>
  );
}
