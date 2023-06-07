import { InferModel, relations } from "drizzle-orm";
import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { type } from "os";

export const Subject = pgTable("subjects", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const subjectRelations = relations(Subject, ({ many }) => ({
  items: many(Item),
}));

export const Item = pgTable("items", {
  id: uuid("id").primaryKey().defaultRandom(),
  content: text("content"),
  finished: boolean("finished").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  subjectId: uuid("subject_id")
    .notNull()
    .references(() => Subject.id, { onDelete: "cascade" }),
});

export const itemRelations = relations(Item, ({ one }) => ({
  subject: one(Subject, {
    fields: [Item.subjectId],
    references: [Subject.id],
  }),
}));

export type Item = InferModel<typeof Item, "select">;
