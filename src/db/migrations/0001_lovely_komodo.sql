ALTER TABLE "items" DROP CONSTRAINT "items_subject_id_subjects_id_fk";

DO $$ BEGIN
 ALTER TABLE "items" ADD CONSTRAINT "items_subject_id_subjects_id_fk" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
