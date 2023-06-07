"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef } from "react";

type Props = {
  addItem: (subjectId: string, item: string) => Promise<void>;
  subjectId: string;
  isDisabled: boolean;
};

export default function AddItemForm({ addItem, subjectId, isDisabled }: Props) {
  const formRef = useRef<HTMLFormElement>(null);

  async function addItemHandler(formData: FormData) {
    if (isDisabled) return;

    const item = formData.get("item");
    if (item) {
      await addItem(subjectId, item.toString());
    }
    formRef.current?.reset();
  }

  return (
    <form
      ref={formRef}
      action={addItemHandler}
      className="flex flex-col md:flex-row"
    >
      <Input
        disabled={isDisabled}
        type="text"
        required
        placeholder="item..."
        name="item"
      />
      <Button disabled={isDisabled} type="submit" className="md:w-24">
        Add
      </Button>
    </form>
  );
}
