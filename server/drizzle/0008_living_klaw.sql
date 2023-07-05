CREATE TABLE IF NOT EXISTS "user" (
	"id" uuid PRIMARY KEY NOT NULL,
	"username" varchar NOT NULL,
	"password" varchar NOT NULL,
	"todos" json NOT NULL,
	"todosOrder" uuid[] NOT NULL
);
