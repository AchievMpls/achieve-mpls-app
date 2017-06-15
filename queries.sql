--CONTENTS:
--sessions table
--users table
--forms table
--events table
--responses table

-- INSTRUCTIONS:
-- Open postico, and connect to your local.
-- Create a new database (I titled mine 'achieveDB').
-- Open 'achieveDB'.
-- Open 'SQL Query', and run the following:

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

-- INSERT INTO "sessions" ("year", "session_count", "grade", "facilitator", "day", "start_time", "school") VALUES ('2016','1','12','Amy','Tuesdays','12:00:00 PM','Jackson');
-- INSERT INTO "sessions" ("year", "session_count", "grade", "facilitator", "day", "start_time", "school") VALUES ('2016','2','9','Adonnis','Mondays','2:00:00 PM','Monroe');
-- INSERT INTO "sessions" ("year", "session_count", "grade", "facilitator", "day", "start_time", "school") VALUES ('2016','3','12','Adonnis','Thursdays','10:10:00 AM','Adams');
-- INSERT INTO "sessions" ("year", "session_count", "grade", "facilitator", "day", "start_time", "school") VALUES ('2016','4','12','Amy','Fridays','8:45:00 AM','Adams');
-- INSERT INTO "sessions" ("year", "session_count", "grade", "facilitator", "day", "start_time", "school") VALUES ('2016','5','9','Adonnis','Wednesdays','8:45:00 AM','Washington');
-- INSERT INTO "sessions" ("year", "session_count", "grade", "facilitator", "day", "start_time", "school") VALUES ('2016','6','12','Amy','Wednesdays','11:10:00 AM','Jackson');
-- INSERT INTO "sessions" ("year", "session_count", "grade", "facilitator", "day", "start_time", "school") VALUES ('2016','7','12','Adonnis','Wednesdays','11:30:00 AM','Harrison');
-- INSERT INTO "sessions" ("year", "session_count", "grade", "facilitator", "day", "start_time", "school") VALUES ('2016','8','9','Amy','Tuesdays','2:00:00 PM','Madison');
-- INSERT INTO "sessions" ("year", "session_count", "grade", "facilitator", "day", "start_time", "school") VALUES ('2016','9','9','Adonnis','Thursdays','10:40:00 AM','Adams');
-- INSERT INTO "sessions" ("year", "session_count", "grade", "facilitator", "day", "start_time", "school") VALUES ('2016','10','9','Amy','Mondays','1:10:00 AM','Adams');
-- INSERT INTO "sessions" ("year", "session_count", "grade", "facilitator", "day", "start_time", "school") VALUES ('2016','11','9','Adonnis','Thursdays','12:20:00 PM','Van Buren');
-- INSERT INTO "sessions" ("year", "session_count", "grade", "facilitator", "day", "start_time", "school") VALUES ('2016','12','12','Adonnis','Thursdays','8:00:00 AM','Washington');
-- INSERT INTO "sessions" ("year", "session_count", "grade", "facilitator", "day", "start_time", "school") VALUES ('2016','13','12','Adonnis','Fridays','10:40:00 AM','Jackson');
-- INSERT INTO "sessions" ("year", "session_count", "grade", "facilitator", "day", "start_time", "school") VALUES ('2016','14','9','Amy','Wednesdays','10:10:00 AM','Harrison');
-- INSERT INTO "sessions" ("year", "session_count", "grade", "facilitator", "day", "start_time", "school") VALUES ('2016','15','12','Adonnis','Tuesdays','12:10:00 PM','Tyler');
-- INSERT INTO "sessions" ("year", "session_count", "grade", "facilitator", "day", "start_time", "school") VALUES ('2016','16','12','Amy','Tuesdays','3:45:00 PM','Jackson');
-- INSERT INTO "sessions" ("year", "session_count", "grade", "facilitator", "day", "start_time", "school") VALUES ('2016','17','9','Adonnis','Tuesdays','10:10:00 AM','Tyler');
-- INSERT INTO "sessions" ("year", "session_count", "grade", "facilitator", "day", "start_time", "school") VALUES ('2016','18','12','Amy','Wednesdays','1:10:00 AM','Monroe');
-- INSERT INTO "sessions" ("year", "session_count", "grade", "facilitator", "day", "start_time", "school") VALUES ('2016','19','9','Adonnis','Mondays','1:10:00 AM','Taylor');
-- INSERT INTO "sessions" ("year", "session_count", "grade", "facilitator", "day", "start_time", "school") VALUES ('2016','20','12','Amy','Fridays','10:35:00 AM','Tyler');
-- INSERT INTO "sessions" ("year", "session_count", "grade", "facilitator", "day", "start_time", "school") VALUES ('2016','21','9','Amy','Fridays','2:00:00 PM','Jefferson');
INSERT INTO "sessions" ("year", "session_count", "grade", "facilitator", "day", "start_time", "school") VALUES ('2017','1','9','Adonnis','Thursdays','8:00:00 AM','Van Buren');
INSERT INTO "sessions" ("year", "session_count", "grade", "facilitator", "day", "start_time", "school") VALUES ('2017','2','9','Adonnis','Thursdays','1:00:00 PM','Tyler');
INSERT INTO "sessions" ("year", "session_count", "grade", "facilitator", "day", "start_time", "school") VALUES ('2017','3','12','Leah','Fridays','12:00:00 PM','Monroe');
INSERT INTO "sessions" ("year", "session_count", "grade", "facilitator", "day", "start_time", "school") VALUES ('2017','4','12','Amy','Mondays','1:00:00 PM','Van Buren');
INSERT INTO "sessions" ("year", "session_count", "grade", "facilitator", "day", "start_time", "school") VALUES ('2017','5','9','Amy','Tuesdays','12:10:00 PM','Jefferson');
INSERT INTO "sessions" ("year", "session_count", "grade", "facilitator", "day", "start_time", "school") VALUES ('2017','6','9','Leah','Mondays','1:00:00 PM','Madison');
INSERT INTO "sessions" ("year", "session_count", "grade", "facilitator", "day", "start_time", "school") VALUES ('2017','7','12','Leah','Tuesdays','3:45:00 PM','Polk');
INSERT INTO "sessions" ("year", "session_count", "grade", "facilitator", "day", "start_time", "school") VALUES ('2017','8','12','Adonnis','Wednesdays','10:10:00 AM','Harrison');
INSERT INTO "sessions" ("year", "session_count", "grade", "facilitator", "day", "start_time", "school") VALUES ('2017','9','9','Amy','Fridays','11:10:00 AM','Polk');
INSERT INTO "sessions" ("year", "session_count", "grade", "facilitator", "day", "start_time", "school") VALUES ('2017','10','9','Amy','Thursdays','1:00:00 PM','Polk');
INSERT INTO "sessions" ("year", "session_count", "grade", "facilitator", "day", "start_time", "school") VALUES ('2017','11','9','Adonnis','Wednesdays','10:35:00 AM','Monroe');
INSERT INTO "sessions" ("year", "session_count", "grade", "facilitator", "day", "start_time", "school") VALUES ('2017','12','9','Amy','Mondays','10:10:00 AM','Adams');
INSERT INTO "sessions" ("year", "session_count", "grade", "facilitator", "day", "start_time", "school") VALUES ('2017','13','9','Amy','Thursdays','1:10:00 AM','Adams');
INSERT INTO "sessions" ("year", "session_count", "grade", "facilitator", "day", "start_time", "school") VALUES ('2017','14','12','Adonnis','Thursdays','12:20:00 PM','Taylor');
INSERT INTO "sessions" ("year", "session_count", "grade", "facilitator", "day", "start_time", "school") VALUES ('2017','15','9','Adonnis','Fridays','12:20:00 PM','Madison');
INSERT INTO "sessions" ("year", "session_count", "grade", "facilitator", "day", "start_time", "school") VALUES ('2017','16','12','Leah','Wednesdays','12:20:00 PM','Jefferson');
INSERT INTO "sessions" ("year", "session_count", "grade", "facilitator", "day", "start_time", "school") VALUES ('2017','17','12','Amy','Fridays','10:10:00 AM','Polk');
INSERT INTO "sessions" ("year", "session_count", "grade", "facilitator", "day", "start_time", "school") VALUES ('2017','18','9','Amy','Fridays','2:00:00 PM','Van Buren');
INSERT INTO "sessions" ("year", "session_count", "grade", "facilitator", "day", "start_time", "school") VALUES ('2017','19','9','Adonnis','Mondays','11:30:00 AM','Harrison');
INSERT INTO "sessions" ("year", "session_count", "grade", "facilitator", "day", "start_time", "school") VALUES ('2017','20','9','Amy','Tuesdays','10:10:00 AM','Jackson');
INSERT INTO "sessions" ("year", "session_count", "grade", "facilitator", "day", "start_time", "school") VALUES ('2017','21','12','Amy','Wednesdays','1:10:00 AM','Washington');


CREATE TABLE "users" (
  "id" serial primary key,
  "fname" varchar(80) not null,
  "lname" varchar(80) not null,
  "email" varchar(80) not null,
  "password" varchar(120) not null,
  "role" varchar(40) not null DEFAULT 'coach' CHECK ("role" = 'coach' OR "role" = 'admin'),
  "session_count" varchar(3),
  "year" varchar(4),
  "chance_token" varchar(120),
  "chance_expiration" date,
  CONSTRAINT only_one_per_list UNIQUE ("email")
);

-- DO NOT RUN THE BELOW CODE.
-- First, find all for 'ypaulsussman' and replace with your personal Gmail address.
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "session_id") VALUES ('Sung','Slama','ypaulsussman+1@gmail.com','Slama25','coach','20');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "session_id") VALUES ('Leah','Largo','ypaulsussman+2@gmail.com','Largo72','coach','12');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "session_id") VALUES ('Georgina','Grieb','ypaulsussman+3@gmail.com','Grieb91','coach','4');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "session_id") VALUES ('Danna','Dawes','ypaulsussman+4@gmail.com','Dawes64','coach','8');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "session_id") VALUES ('Ayanna','Amundsen','ypaulsussman+5@gmail.com','Amundsen85','coach','13');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "session_id") VALUES ('Yukiko','Yarbrough','ypaulsussman+6@gmail.com','Yarbrough54','coach','6');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "session_id") VALUES ('Klara','Keele','ypaulsussman+7@gmail.com','Keele42','coach','4');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "session_id") VALUES ('Clora','Collado','ypaulsussman+8@gmail.com','Collado24','coach','15');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "session_id") VALUES ('Autumn','Arambula','ypaulsussman+9@gmail.com','Arambula27','coach','12');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "session_id") VALUES ('Chi','Crider','ypaulsussman+10@gmail.com','Crider2','coach','16');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "session_id") VALUES ('Shondra','Shankle','ypaulsussman+11@gmail.com','Shankle83','coach','3');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "session_id") VALUES ('Moriah','Macke','ypaulsussman+12@gmail.com','Macke76','coach','9');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "session_id") VALUES ('Alison','Adamski','ypaulsussman+13@gmail.com','Adamski70','coach','1');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "session_id") VALUES ('Cathey','Carney','ypaulsussman+14@gmail.com','Carney57','coach','1');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "session_id") VALUES ('Agripina','Apgar','ypaulsussman+15@gmail.com','Apgar67','coach','16');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "session_id") VALUES ('Cicely','Cram','ypaulsussman+16@gmail.com','Cram88','coach','11');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "session_id") VALUES ('Andrew','Andrews','ypaulsussman+17@gmail.com','Andrews80','coach','1');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "session_id") VALUES ('Alita','Arambula','ypaulsussman+18@gmail.com','Arambula7','coach','4');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "session_id") VALUES ('Mauricio','Mcglown','ypaulsussman+19@gmail.com','Mcglown16','coach','16');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "session_id") VALUES ('Page','Pastor','ypaulsussman+20@gmail.com','Pastor23','coach','16');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "session_id") VALUES ('Deetta','Dority','ypaulsussman+21@gmail.com','Dority21','coach','13');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "session_id") VALUES ('Damion','Dupler','ypaulsussman+22@gmail.com','Dupler5','coach','1');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "session_id") VALUES ('Geri','Getty','ypaulsussman+23@gmail.com','Getty29','coach','15');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "session_id") VALUES ('Charita','Cybulski','ypaulsussman+24@gmail.com','Cybulski23','coach','15');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "session_id") VALUES ('Huong','Hoeft','ypaulsussman+25@gmail.com','Hoeft67','coach','18');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "session_id") VALUES ('Hollis','Hannold','ypaulsussman+26@gmail.com','Hannold20','coach','9');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "session_id") VALUES ('Cecilia','Carberry','ypaulsussman+27@gmail.com','Carberry14','coach','14');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "session_id") VALUES ('Hilaria','Hauser','ypaulsussman+28@gmail.com','Hauser62','coach','5');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "session_id") VALUES ('Fletcher','Flett','ypaulsussman+29@gmail.com','Flett53','coach','3');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "session_id") VALUES ('Lyman','Lucarelli','ypaulsussman+30@gmail.com','Lucarelli67','coach','17');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "session_id") VALUES ('Oretha','Oglesby','ypaulsussman+31@gmail.com','Oglesby19','coach','5');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "session_id") VALUES ('Annabell','Averett','ypaulsussman+32@gmail.com','Averett87','coach','10');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "session_id") VALUES ('Rolf','Rosenbaum','ypaulsussman+33@gmail.com','Rosenbaum93','coach','3');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "session_id") VALUES ('Lucinda','Linehan','ypaulsussman+34@gmail.com','Linehan1','coach','8');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "session_id") VALUES ('Dorethea','Doster','ypaulsussman+35@gmail.com','Doster54','coach','9');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "session_id") VALUES ('Michal','Meese','ypaulsussman+36@gmail.com','Meese58','coach','16');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "session_id") VALUES ('Dollie','Durney','ypaulsussman+37@gmail.com','Durney29','coach','11');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "session_id") VALUES ('Adrien','Alderson','ypaulsussman+38@gmail.com','Alderson10','coach','10');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "session_id") VALUES ('Beth','Bergman','ypaulsussman+39@gmail.com','Bergman27','coach','4');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "session_id") VALUES ('William','Wilber','ypaulsussman+40@gmail.com','Wilber78','coach','3');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "session_id") VALUES ('Marisha','Monger','ypaulsussman+41@gmail.com','Monger90','coach','10');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "session_id") VALUES ('Laticia','Lapp','ypaulsussman+42@gmail.com','Lapp78','coach','7');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "session_id") VALUES ('Lenard','Larkin','ypaulsussman+43@gmail.com','Larkin68','coach','13');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "session_id") VALUES ('Kristy','Kinyon','ypaulsussman+44@gmail.com','Kinyon77','coach','19');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "session_id") VALUES ('Meaghan','Mendivil','ypaulsussman+45@gmail.com','Mendivil87','coach','7');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "session_id") VALUES ('Selina','Santana','ypaulsussman+46@gmail.com','Santana98','coach','5');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "session_id") VALUES ('Carli','Council','ypaulsussman+47@gmail.com','Council68','coach','15');
INSERT INTO "users" ("fname", "lname", "email", "password", "role") VALUES ('Mariella','Monzon','ypaulsussman+48@gmail.com','Monzon45','admin');
INSERT INTO "users" ("fname", "lname", "email", "password", "role") VALUES ('Theresia','Tuner','ypaulsussman+49@gmail.com','Tuner27','admin');
INSERT INTO "users" ("fname", "lname", "email", "password", "role") VALUES ('Herman','Harshbarger','ypaulsussman+50@gmail.com','Harshbarger55','admin');

CREATE TABLE "forms" (
  "id" serial primary key,
  "form_name" varchar(80) not null,
  "q1_prompt" varchar(500),
  "q2_prompt" varchar(500),
  "q3_prompt" varchar(500),
  "q4_prompt" varchar(500),
  "q5_prompt" varchar(500)
);

INSERT INTO "forms" ("form_name", "q1_prompt", "q2_prompt") VALUES ('Default','On a scale of 1-10, how would you rate this session?','What can AchieveMpls do to support you?');
INSERT INTO "forms" ("form_name", "q1_prompt", "q2_prompt", "q3_prompt", "q4_prompt", "q5_prompt") VALUES ('Transportation Focus','On a scale of 1-10, how would you rate this session?','What can AchieveMpls do to support you?','Which highways do you take, if any, to reach your school?','Do you drive, or use public transit?','What is the most difficult part of your commute?');
INSERT INTO "forms" ("form_name", "q1_prompt", "q2_prompt", "q3_prompt", "q4_prompt") VALUES ('Monroe-Specific','On a scale of 1-10, how would you rate this session?','What is unique about Monroe High School?','How does it compare to other schools you have tutored at?','Would you tutor at this school again? Why or why not?');

CREATE TABLE "events" (
  "id" serial primary key,
  "session_id" integer REFERENCES "sessions",
  "meeting_count" integer not null,
  "form_id" integer REFERENCES "forms" DEFAULT 1,
  "date_form_open" date,
  "date_form_close" date,
  UNIQUE ("session_id", "meeting_count")
);

INSERT INTO "events" ("session_id", "meeting_count", "form_id", "date_form_open", "date_form_close") VALUES ('1','1','1','2016-09-12','2016-09-25');
INSERT INTO "events" ("session_id", "meeting_count", "form_id", "date_form_open", "date_form_close") VALUES ('1','2','1','2016-09-26','2016-10-09');
INSERT INTO "events" ("session_id", "meeting_count", "form_id", "date_form_open", "date_form_close") VALUES ('1','3','2','2016-10-10','2016-10-23');
INSERT INTO "events" ("session_id", "meeting_count", "form_id", "date_form_open", "date_form_close") VALUES ('1','4','2','2016-10-24','2016-11-06');
INSERT INTO "events" ("session_id", "meeting_count", "form_id", "date_form_open", "date_form_close") VALUES ('1','5','1','2016-11-07','2016-11-20');
INSERT INTO "events" ("session_id", "meeting_count", "form_id", "date_form_open", "date_form_close") VALUES ('1','6','1','2016-11-21','2016-12-04');
INSERT INTO "events" ("session_id", "meeting_count", "form_id", "date_form_open", "date_form_close") VALUES ('2','1','1','2016-09-15','2016-09-28');
INSERT INTO "events" ("session_id", "meeting_count", "form_id", "date_form_open", "date_form_close") VALUES ('2','2','3','2016-09-29','2016-10-12');
INSERT INTO "events" ("session_id", "meeting_count", "form_id", "date_form_open", "date_form_close") VALUES ('2','3','3','2016-10-13','2016-10-26');
INSERT INTO "events" ("session_id", "meeting_count", "form_id", "date_form_open", "date_form_close") VALUES ('2','4','1','2016-10-27','2016-11-09');
INSERT INTO "events" ("session_id", "meeting_count", "form_id", "date_form_open", "date_form_close") VALUES ('2','5','1','2016-11-10','2016-11-23');
INSERT INTO "events" ("session_id", "meeting_count", "form_id", "date_form_open", "date_form_close") VALUES ('3','1','1','2016-09-13','2016-09-26');
INSERT INTO "events" ("session_id", "meeting_count", "form_id", "date_form_open", "date_form_close") VALUES ('3','2','1','2016-09-27','2016-10-10');
INSERT INTO "events" ("session_id", "meeting_count", "form_id", "date_form_open", "date_form_close") VALUES ('3','3','1','2016-10-11','2016-10-24');
INSERT INTO "events" ("session_id", "meeting_count", "form_id", "date_form_open", "date_form_close") VALUES ('3','4','1','2016-10-25','2016-11-07');
INSERT INTO "events" ("session_id", "meeting_count", "form_id", "date_form_open", "date_form_close") VALUES ('3','5','1','2016-11-08','2016-11-21');
INSERT INTO "events" ("session_id", "meeting_count", "form_id", "date_form_open", "date_form_close") VALUES ('4','1','1','2016-09-09','2016-09-22');
INSERT INTO "events" ("session_id", "meeting_count", "form_id", "date_form_open", "date_form_close") VALUES ('4','2','1','2016-09-23','2016-10-06');
INSERT INTO "events" ("session_id", "meeting_count", "form_id", "date_form_open", "date_form_close") VALUES ('4','3','1','2016-10-07','2016-10-20');
INSERT INTO "events" ("session_id", "meeting_count", "form_id", "date_form_open", "date_form_close") VALUES ('4','4','1','2016-10-21','2016-11-03');
INSERT INTO "events" ("session_id", "meeting_count", "form_id", "date_form_open", "date_form_close") VALUES ('4','5','1','2016-11-04','2016-11-17');
INSERT INTO "events" ("session_id", "meeting_count", "form_id", "date_form_open", "date_form_close") VALUES ('5','1','2','2016-09-16','2016-09-29');
INSERT INTO "events" ("session_id", "meeting_count", "form_id", "date_form_open", "date_form_close") VALUES ('5','2','2','2016-09-30','2016-10-13');
INSERT INTO "events" ("session_id", "meeting_count", "form_id", "date_form_open", "date_form_close") VALUES ('5','3','1','2016-10-14','2016-10-27');
INSERT INTO "events" ("session_id", "meeting_count", "form_id", "date_form_open", "date_form_close") VALUES ('5','4','1','2016-10-28','2016-11-10');
INSERT INTO "events" ("session_id", "meeting_count", "form_id", "date_form_open", "date_form_close") VALUES ('5','5','1','2016-11-18','2016-12-01');

CREATE TABLE "form_responses" (
  "id" serial primary key,
  "user_id" integer REFERENCES "users",
  "event_id" integer REFERENCES "events",
  "date_form_completed" date,
  "q1_answer" integer CHECK ("q1_answer" > 0 AND "q1_answer" < 11 ) not null,
  "q2_answer" varchar(1500),
  "q3_answer" varchar(1500),
  "q4_answer" varchar(1500),
  "q5_answer" varchar(1500)
);

INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer") VALUES ('13','1','2017-03-15','3','Aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh. In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet. Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer") VALUES ('14','1','2017-03-16','4','Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus. Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer") VALUES ('17','1','2017-03-17','5','Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet. Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer") VALUES ('22','1','2017-03-16','1','Quisque ut erat.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer") VALUES ('13','2','2017-03-29','7','Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor. Duis mattis egestas metus.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer") VALUES ('14','2','2017-03-30','8','Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer") VALUES ('17','2','2017-04-01','7','Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer") VALUES ('22','2','2017-03-30','5','Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer", "q3_answer", "q4_answer", "q5_answer") VALUES ('13','3','2017-04-13','9','The waves were crashing on the shore; it was a lovely sight.','The river stole the gods.','I checked to make sure that he was still alive.','Writing a list of random sentences is harder than I initially thought it would be.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer", "q3_answer", "q4_answer", "q5_answer") VALUES ('14','3','2017-04-14','4','Someone I know recently combined Maple Syrup & buttered Popcorn thinking it would taste like caramel popcorn. It didn’t and they don’t recommend anyone else do it either.','I love eating toasted cheese and tuna sandwiches.','The old apple revels in its authority.','When I was little I had a car door slammed shut on my hand. I still remember it quite vividly.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer", "q3_answer", "q4_answer", "q5_answer") VALUES ('17','3','2017-04-15','6','I was very proud of my nickname throughout high school but today- I couldn’t be any different to what my nickname was.','The quick brown fox jumps over the lazy dog.','The mysterious diary records the voice.','Mary plays the piano.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer", "q3_answer", "q4_answer", "q5_answer") VALUES ('22','3','2017-04-14','2','If Purple People Eaters are real… where do they find purple people to eat?','I want to buy a onesie… but know it won’t suit me.','She did her best to help him.','He said he was not there yesterday; however, many people saw him there.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer", "q3_answer", "q4_answer", "q5_answer") VALUES ('13','4','2017-04-27','3','Lobortis sodales ac eget, per at turpis pellentesque duis, elit in sem ridiculus diam.','Nam amet enim ut non, sit dui lectus maiores.','A amet ut sit non, ligula sapien id fringilla sed, eget odio nunc dui.','Enim neque ac nam consequat, penatibus dolor suspendisse et a, wisi suspendisse in nulla vestibulum.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer", "q3_answer", "q4_answer", "q5_answer") VALUES ('14','4','2017-04-28','3','Sagittis volutpat arcu commodo, nam viverra amet enim.','Amet adipiscing integer elit ac, morbi quisque vel ipsam eleifend, quam hac lorem tempus dui.','Elementum vitae etiam volutpat, sint donec tincidunt consectetuer.','Accumsan ducimus massa erat, porttitor excepteur mauris etiam vel, at in et amet, ullamcorper faucibus in risus.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer", "q3_answer", "q4_answer", "q5_answer") VALUES ('17','4','2017-04-29','2','Erat amet wisi ac ultrices, at et lacus volutpat, libero viverra aliquam gravida sagittis.','Arcu adipiscing nullam metus sed, urna justo at eu amet, dui in vestibulum diam rhoncus, neque ac ultricies sit.','Mauris magna sed dui, erat eleifend ut rhoncus arcu, aliquam quisque mauris iaculis felis, integer eget vel fermentum semper.','Congue etiam nunc fringilla, amet magnis quis vel cum, morbi suspendisse pretium placeat maecenas, platea vivamus vestibulum lacus aut.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer", "q3_answer", "q4_answer", "q5_answer") VALUES ('22','4','2017-04-28','3','Id velit pede suscipit posuere, bibendum aenean duis justo nunc, risus dui massa vitae tincidunt, volutpat ut senectus adipiscing eleifend.','Officia et vel ut wisi, elit tristique magna odio.','Ut cupidatat dis tortor, nibh quis conubia ac adipiscing, faucibus dui mauris quo urna.','Scelerisque consectetuer pede suspendisse, enim mauris ipsum enim, accumsan ipsum et curabitur rutrum.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer") VALUES ('11','12','2017-03-28','10','Christmas is coming.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer") VALUES ('29','12','2017-03-30','10','I often see the time 11:11 or 12:34 on clocks.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer") VALUES ('33','12','2017-04-02','10','The book is in front of the table.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer") VALUES ('40','12','2017-03-29','7','Italy is my favorite country; in fact, I plan to spend two weeks there next year.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer") VALUES ('11','13','2017-04-12','5','There was no ice cream in the freezer, nor did they have money to go to the store.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer") VALUES ('29','13','2017-04-14','5','Check back tomorrow; I will see if the book has arrived.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer") VALUES ('33','13','2017-04-16','2','She advised him to come back at once.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer") VALUES ('40','13','2017-04-13','8','I love eating toasted cheese and tuna sandwiches.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer") VALUES ('11','14','2017-04-26','4','He ran out of money, so he had to stop playing poker.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer") VALUES ('29','14','2017-04-28','2','Tom got a small piece of pie.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer") VALUES ('33','14','2017-04-30','3','She only paints with bold colors; she does not like pastels.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer") VALUES ('40','14','2017-04-27','10','Should we start class now, or should we wait for everyone to get here?');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer") VALUES ('11','15','2017-05-09','6','Tom got a small piece of pie.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer") VALUES ('29','15','2017-05-11','3','He didn’t want to go to the dentist, yet he went anyway.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer") VALUES ('33','15','2017-05-13','10','Malls are great places to shop; I can find everything I need under one roof.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer") VALUES ('40','15','2017-05-10','2','Yeah, I think it is a good environment for learning English.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer") VALUES ('3','17','2017-03-12','9','Magna pellentesque est vestibulum quam, tristique varius leo sed ligula, luctus ligula sodales vestibulum neque.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer") VALUES ('7','17','2017-03-09','3','Vel ut commodo turpis, amet rhoncus eget in egestas.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer") VALUES ('18','17','2017-03-10','6','Enim diam aenean turpis magna, praesent aliquam tempus eget pharetra, fermentum vehicula sit posuere aut, risus semper morbi pulvinar nullam.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer") VALUES ('39','17','2017-03-14','9','Nullam lacus vel arcu eros, sit vestibulum consectetuer adipiscing dui.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer") VALUES ('3','18','2017-03-26','5','Consectetuer consectetuer quisque mauris aliquet, imperdiet eu placerat suscipit est, litora eleifend porttitor arcu, posuere pulvinar neque duis massa.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer") VALUES ('7','18','2017-03-23','3','Eget tellus sit elit, ac nulla in non, faucibus vitae nunc luctus vivamus, laoreet quis volutpat varius.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer") VALUES ('18','18','2017-03-24','4','Orci id vestibulum amet, dui elit etiam gravida, rhoncus luctus magna etiam ante.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer") VALUES ('39','18','2017-03-28','8','Pellentesque fusce vestibulum sociis suspendisse, adipiscing cras lectus porttitor diam, sed suscipit consequat massa lobortis, ut eleifend ut donec duis.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer") VALUES ('3','19','2017-04-10','3','Sagittis velit orci tincidunt, erat eget phasellus tempor sit, porta integer sunt praesent, ullamcorper magna aliquam ipsum proin.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer") VALUES ('7','19','2017-04-07','5','Scelerisque reprehenderit dolor sit libero, curabitur cras pretium luctus.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer") VALUES ('18','19','2017-04-08','2','Augue vestibulum quis libero, tristique ligula tincidunt ac aenean.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer") VALUES ('39','19','2017-04-12','2','Et lacus libero vestibulum, congue libero diam parturient.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer") VALUES ('3','20','2017-04-24','10','Dictum eros arcu molestie sapien, suscipit ac elit turpis, cursus libero arcu vulputate, morbi ante eget ex lorem.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer") VALUES ('7','20','2017-04-21','9','Accumsan libero commodo at, faucibus magna ultricies placerat blandit.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer") VALUES ('18','20','2017-04-22','1','In at convallis dapibus nulla, nec interdum sed tempor odio, massa quisque pulvinar felis pellentesque, ac velit quis duis.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer") VALUES ('39','20','2017-04-26','1','Dui tempus convallis sed, blandit sagittis suspendisse elit, dolore est orci mauris, pharetra non libero mattis sagittis.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer", "q3_answer", "q4_answer", "q5_answer") VALUES ('28','22','2017-03-20','9','Viverra massa mauris dignissim massa, nullam sed amet eget, dolor libero alias at eum.','Erat hic ac quis eu, magna et eu sollicitudin, aenean donec in nonummy, lorem maecenas duis suspendisse.','Aliquam a eget dictumst, nec dictum erat lobortis, posuere morbi mollis per maecenas, blandit magnis ipsum cras id.','Vestibulum luctus semper dui, at feugiat maecenas sed, sed vitae non odio nibh.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer", "q3_answer", "q4_answer", "q5_answer") VALUES ('31','22','2017-03-18','2','In donec massa purus aenean, dolor aenean mi dapibus.','Enim quis aliquam turpis erat, eu taciti suscipit dictum neque, sit massa lobortis donec metus, amet eligendi wisi sem et.','Aliquam est nec vel cum, imperdiet viverra metus sed tempus, vivamus ut metus lacus quidem.','Hymenaeos tristique condimentum sem, tincidunt vehicula a neque, tempor congue lacus inceptos.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer", "q3_answer", "q4_answer", "q5_answer") VALUES ('46','22','2017-03-20','3','Sed mauris mauris ligula sed, ac in tellus sem, tincidunt duis integer sed.','Proin a suspendisse egestas ut, nullam gravida quis sagittis elit, auctor enim eget ut vel, pellentesque sit eget ac.','Felis sollicitudin neque morbi, id eu vivamus velit, amet potenti senectus quis, turpis etiam sit sed sed.','Amet vel rhoncus libero morbi, bibendum sed gravida facilisis, suspendisse condimentum aliquam sint.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer", "q3_answer", "q4_answer", "q5_answer") VALUES ('28','23','2017-04-04','5','Bibendum tincidunt integer vestibulum, fermentum elit imperdiet et condimentum, amet ac non lorem, sapien non amet suscipit.','Urna lacinia quisque ut adipisci, cursus magna vitae dui.','Vitae nec in in venenatis, et molestie blandit fusce id, erat id vehicula mauris, interdum ut interdum odio diam.','Ad vestibulum deserunt pharetra, orci egestas cursus lacus.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer", "q3_answer", "q4_answer", "q5_answer") VALUES ('31','23','2017-04-02','8','Montes pede augue consectetuer sed, in et in tellus, maecenas erat facilisis sit, amet laoreet orci wisi.','Ut fusce arcu laudantium augue, leo in porttitor placerat, quam odio laoreet nec urna.','Urna elementum in volutpat, lectus dignissim dui amet velit.','Et ad mi sed quisque, in mus molestiae velit nascetur, justo sollicitudin ac ut, luctus donec sapien pretium risus.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer", "q3_answer", "q4_answer", "q5_answer") VALUES ('46','23','2017-04-04','5','Elementum quam aliquam est venenatis, mauris mus fusce velit.','Dictum scelerisque tincidunt eget, nulla semper dui hac vitae, interdum mi parturient tempor donec, mollis orci id ipsum.','Eleifend vestibulum mauris in in, ut orci arcu venenatis.','Sollicitudin proin vestibulum mauris urna, molestie ullamcorper fringilla sodales, sed quis aliquam porta eros.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer") VALUES ('28','24','2017-04-18','4','Metus vel mauris viverra justo, wisi habitant sed dolor odio, curabitur nunc enim ligula.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer") VALUES ('31','24','2017-04-16','2','Aliquet aliquam leo quis curabitur, maecenas pellentesque urna mattis.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer") VALUES ('46','24','2017-04-18','2','Dui augue per nec, in egestas enim arcu viverra, aenean in magna velit donec, tellus a volutpat pede.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer") VALUES ('28','25','2017-05-01','9','Fusce convallis sed amet morbi, nec mauris mauris id.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer") VALUES ('31','25','2017-04-30','1','Suspendisse proin nisl velit, vivamus est sit taciti morbi, nostrud duis nec elit, nunc eros arcu diam dictumst.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer") VALUES ('46','25','2017-05-01','9','Massa ut est sed, et ante dictum suspendisse, in tellus donec a rutrum.');
