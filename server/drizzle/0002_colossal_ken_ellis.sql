ALTER TABLE "todos" ALTER COLUMN "userId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "todos" ALTER COLUMN "content" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "todos" ALTER COLUMN "complete" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "username" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "password" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "todosOrder" SET NOT NULL;