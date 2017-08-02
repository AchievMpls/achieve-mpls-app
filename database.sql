CREATE TABLE "sessions" (
  "id" serial primary key,
  "year" integer not null,
  "session_count" integer not null,
  "grade" integer not null CHECK ("grade" = 9 OR "grade" = 12),
  "facilitator" varchar(120) not null,
  "day" varchar(120),
  "start_time" time,
  "school" varchar(120),
  UNIQUE ("year", "session_count")
);

CREATE TABLE "users" (
  "id" serial primary key,
  "fname" varchar(80) not null,
  "lname" varchar(80) not null,
  "email" varchar(80) not null,
  "password" varchar(120) not null,
  "role" varchar(40) not null DEFAULT 'coach' CHECK ("role" = 'coach' OR "role" = 'admin'),
  "session_id" integer REFERENCES "sessions",
  "session_count" varchar(3),
  "year" varchar(4),
  "chance_token" varchar(120),
  "chance_expiration" date,
  CONSTRAINT only_one_per_list UNIQUE ("email")
);


CREATE TABLE "forms" (
  "id" serial primary key,
  "form_name" varchar(80) not null,
  "form_active" boolean not null
);

CREATE TABLE "questions" (
  "id" serial primary key,
  "form_id" integer REFERENCES "forms",
  "form_name" varchar (80) not null,
  "question" varchar (500)
);

CREATE TABLE "events" (
  "id" serial primary key,
  "session_id" integer REFERENCES "sessions",
  "meeting_count" integer not null,
  "form_id" integer REFERENCES "forms" DEFAULT 1,
  "date_form_open" date,
  "date_form_close" date,
  UNIQUE ("session_id", "meeting_count")
);

CREATE TABLE "form_responses" (
  "id" serial primary key,
  "user_id" integer REFERENCES "users",
  "event_id" integer REFERENCES "events",
  "session_id" integer REFERENCES "sessions",
  "form_id" integer REFERENCES "forms",
  "question_id" integer REFERENCES "questions",
  "date_form_completed" date,
  "question" varchar (500),
  "answer" varchar (500)
);

INSERT into "forms" ("form_name", "form_active") VALUES ('default', 'true');

INSERT into "questions" ("form_id", "form_name", "question") VALUES ('1', 'default', 'On a scale of 1-10 how would you rate your event today?'); 
