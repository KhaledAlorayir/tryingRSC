"use client";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Item } from "@/db/schema";

type Props = {
  item: Item;
};

export default function ItemCard({ item }: Props) {
  return (
    <Card key={item.id} className="flex items-center justify-between mb-4">
      <CardHeader>
        <CardTitle>{item.content}</CardTitle>
        <CardDescription>
          {item.createdAt.toLocaleDateString()}.
        </CardDescription>
      </CardHeader>
      <div className="px-4 flex flex-col gap-y-2">
        <Button variant="ghost">X</Button>
        <Switch checked={item.finished} />
      </div>
    </Card>
  );
}
