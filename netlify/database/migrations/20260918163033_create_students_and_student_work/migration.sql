CREATE TABLE "student_work" (
	"id" serial PRIMARY KEY,
	"student_id" integer NOT NULL,
	"topic_id" text NOT NULL,
	"quiz_answers" jsonb DEFAULT '{}' NOT NULL,
	"quiz_submitted" integer DEFAULT 0 NOT NULL,
	"quiz_score" integer,
	"quiz_total" integer,
	"organizer_notes" text DEFAULT '' NOT NULL,
	"video_notes" text DEFAULT '' NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "students" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL,
	"username" text NOT NULL UNIQUE,
	"password_hash" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE UNIQUE INDEX "student_work_student_topic_idx" ON "student_work" ("student_id","topic_id");--> statement-breakpoint
ALTER TABLE "student_work" ADD CONSTRAINT "student_work_student_id_students_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE;