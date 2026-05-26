CREATE TYPE "public"."consultation_region" AS ENUM('us', 'canada', 'europa');--> statement-breakpoint
CREATE TYPE "public"."consultation_status" AS ENUM('pending', 'confirmed', 'completed', 'cancelled');--> statement-breakpoint
CREATE TABLE "consultation_requests" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text,
	"region" "consultation_region" NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text,
	"preferred_date" timestamp NOT NULL,
	"preferred_time_slot" text NOT NULL,
	"topic" text NOT NULL,
	"status" "consultation_status" DEFAULT 'pending' NOT NULL,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "consultation_requests" ADD CONSTRAINT "consultation_requests_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "consult_status_idx" ON "consultation_requests" USING btree ("status");--> statement-breakpoint
CREATE INDEX "consult_date_idx" ON "consultation_requests" USING btree ("preferred_date");