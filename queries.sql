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

INSERT INTO "sessions" ("year", "session_count", "grade", "facilitator", "day", "start_time", "school") VALUES ('2016','1','12','Amy','Tuesdays','12:00:00 PM','Jackson');
INSERT INTO "sessions" ("year", "session_count", "grade", "facilitator", "day", "start_time", "school") VALUES ('2016','2','9','Adonnis','Mondays','2:00:00 PM','Monroe');
INSERT INTO "sessions" ("year", "session_count", "grade", "facilitator", "day", "start_time", "school") VALUES ('2016','3','12','Adonnis','Thursdays','10:10:00 AM','Adams');
INSERT INTO "sessions" ("year", "session_count", "grade", "facilitator", "day", "start_time", "school") VALUES ('2016','4','12','Amy','Fridays','8:45:00 AM','Adams');
INSERT INTO "sessions" ("year", "session_count", "grade", "facilitator", "day", "start_time", "school") VALUES ('2016','5','9','Adonnis','Wednesdays','8:45:00 AM','Washington');
INSERT INTO "sessions" ("year", "session_count", "grade", "facilitator", "day", "start_time", "school") VALUES ('2016','6','12','Amy','Wednesdays','11:10:00 AM','Jackson');
INSERT INTO "sessions" ("year", "session_count", "grade", "facilitator", "day", "start_time", "school") VALUES ('2016','7','12','Adonnis','Wednesdays','11:30:00 AM','Harrison');
INSERT INTO "sessions" ("year", "session_count", "grade", "facilitator", "day", "start_time", "school") VALUES ('2016','8','9','Amy','Tuesdays','2:00:00 PM','Madison');
INSERT INTO "sessions" ("year", "session_count", "grade", "facilitator", "day", "start_time", "school") VALUES ('2016','9','9','Adonnis','Thursdays','10:40:00 AM','Adams');
INSERT INTO "sessions" ("year", "session_count", "grade", "facilitator", "day", "start_time", "school") VALUES ('2016','10','9','Amy','Mondays','1:10:00 AM','Adams');
INSERT INTO "sessions" ("year", "session_count", "grade", "facilitator", "day", "start_time", "school") VALUES ('2016','11','9','Adonnis','Thursdays','12:20:00 PM','Van Buren');
INSERT INTO "sessions" ("year", "session_count", "grade", "facilitator", "day", "start_time", "school") VALUES ('2016','12','12','Adonnis','Thursdays','8:00:00 AM','Washington');
INSERT INTO "sessions" ("year", "session_count", "grade", "facilitator", "day", "start_time", "school") VALUES ('2016','13','12','Adonnis','Fridays','10:40:00 AM','Jackson');
INSERT INTO "sessions" ("year", "session_count", "grade", "facilitator", "day", "start_time", "school") VALUES ('2016','14','9','Amy','Wednesdays','10:10:00 AM','Harrison');
INSERT INTO "sessions" ("year", "session_count", "grade", "facilitator", "day", "start_time", "school") VALUES ('2016','15','12','Adonnis','Tuesdays','12:10:00 PM','Tyler');
INSERT INTO "sessions" ("year", "session_count", "grade", "facilitator", "day", "start_time", "school") VALUES ('2016','16','12','Amy','Tuesdays','3:45:00 PM','Jackson');
INSERT INTO "sessions" ("year", "session_count", "grade", "facilitator", "day", "start_time", "school") VALUES ('2016','17','9','Adonnis','Tuesdays','10:10:00 AM','Tyler');
INSERT INTO "sessions" ("year", "session_count", "grade", "facilitator", "day", "start_time", "school") VALUES ('2016','18','12','Amy','Wednesdays','1:10:00 AM','Monroe');
INSERT INTO "sessions" ("year", "session_count", "grade", "facilitator", "day", "start_time", "school") VALUES ('2016','19','9','Adonnis','Mondays','1:10:00 AM','Taylor');
INSERT INTO "sessions" ("year", "session_count", "grade", "facilitator", "day", "start_time", "school") VALUES ('2016','20','12','Amy','Fridays','10:35:00 AM','Tyler');
INSERT INTO "sessions" ("year", "session_count", "grade", "facilitator", "day", "start_time", "school") VALUES ('2016','21','9','Amy','Fridays','2:00:00 PM','Jefferson');
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
  "session_id" integer REFERENCES "sessions",
  "chance_token" varchar(120),
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

INSERT INTO "events" ("session_id", "meeting_count", "form_id", "date_form_open", "date_form_close") VALUES ('1','1','1','2016-09-12','2016-09-19');
INSERT INTO "events" ("session_id", "meeting_count", "form_id", "date_form_open", "date_form_close") VALUES ('1','2','1','2016-09-26','2016-09-30');
INSERT INTO "events" ("session_id", "meeting_count", "form_id", "date_form_open", "date_form_close") VALUES ('1','3','2','2016-10-10','2016-10-17');
INSERT INTO "events" ("session_id", "meeting_count", "form_id", "date_form_open", "date_form_close") VALUES ('1','4','2','2016-11-10','2016-11-17');
INSERT INTO "events" ("session_id", "meeting_count", "form_id", "date_form_open", "date_form_close") VALUES ('1','5','1','2016-11-18','2016-11-25');
INSERT INTO "events" ("session_id", "meeting_count", "form_id", "date_form_open", "date_form_close") VALUES ('1','6','1','2016-11-25','2016-11-30');
INSERT INTO "events" ("session_id", "meeting_count", "form_id", "date_form_open", "date_form_close") VALUES ('2','1','1','2016-12-21','2016-12-28');
INSERT INTO "events" ("session_id", "meeting_count", "form_id", "date_form_open", "date_form_close") VALUES ('2','2','3','2016-12-27','2016-12-31');
INSERT INTO "events" ("session_id", "meeting_count", "form_id", "date_form_open", "date_form_close") VALUES ('2','3','3','2017-01-30','2017-02-07');
INSERT INTO "events" ("session_id", "meeting_count", "form_id", "date_form_open", "date_form_close") VALUES ('3','1','1','2017-02-02','2017-02-09');
INSERT INTO "events" ("session_id", "meeting_count", "form_id", "date_form_open", "date_form_close") VALUES ('4','1','1','2017-02-08','2017-02-15');
INSERT INTO "events" ("session_id", "meeting_count", "form_id", "date_form_open", "date_form_close") VALUES ('5','1','2','2017-02-15','2017-02-22');
INSERT INTO "events" ("session_id", "meeting_count", "form_id", "date_form_open", "date_form_close") VALUES ('5','2','2','2017-03-27','2017-04-05');
INSERT INTO "events" ("session_id", "meeting_count", "form_id", "date_form_open", "date_form_close") VALUES ('5','3','1','2017-04-05','2017-04-12');
INSERT INTO "events" ("session_id", "meeting_count", "form_id", "date_form_open", "date_form_close") VALUES ('5','4','1','2017-04-28','2017-05-06');

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
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer", "q3_answer", "q4_answer", "q5_answer") VALUES ('13','3','2016-09-12','9','The waves were crashing on the shore; it was a lovely sight.','The river stole the gods.','I checked to make sure that he was still alive.','Writing a list of random sentences is harder than I initially thought it would be.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer", "q3_answer", "q4_answer", "q5_answer") VALUES ('14','3','2016-09-26','4','Someone I know recently combined Maple Syrup & buttered Popcorn thinking it would taste like caramel popcorn. It didn’t and they don’t recommend anyone else do it either.','I love eating toasted cheese and tuna sandwiches.','The old apple revels in its authority.','When I was little I had a car door slammed shut on my hand. I still remember it quite vividly.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer", "q3_answer", "q4_answer", "q5_answer") VALUES ('17','3','2016-10-10','6','I was very proud of my nickname throughout high school but today- I couldn’t be any different to what my nickname was.','The quick brown fox jumps over the lazy dog.','The mysterious diary records the voice.','Mary plays the piano.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer", "q3_answer", "q4_answer", "q5_answer") VALUES ('22','3','2016-11-10','2','If Purple People Eaters are real… where do they find purple people to eat?','I want to buy a onesie… but know it won’t suit me.','She did her best to help him.','He said he was not there yesterday; however, many people saw him there.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer") VALUES ('11','10','2016-11-18','10','Christmas is coming.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer") VALUES ('29','10','2016-11-25','10','I often see the time 11:11 or 12:34 on clocks.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer") VALUES ('33','10','2016-12-21','10','The book is in front of the table.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer") VALUES ('40','10','2016-12-27','7','Italy is my favorite country; in fact, I plan to spend two weeks there next year.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer", "q3_answer", "q4_answer", "q5_answer") VALUES ('28','13','2017-01-30','5','There was no ice cream in the freezer, nor did they have money to go to the store.','She only paints with bold colors; she does not like pastels.','He didn’t want to go to the dentist, yet he went anyway.','Writing a list of random sentences is harder than I initially thought it would be.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer", "q3_answer", "q4_answer", "q5_answer") VALUES ('31','13','2017-02-02','5','Check back tomorrow; I will see if the book has arrived.','Should we start class now, or should we wait for everyone to get here?','Malls are great places to shop; I can find everything I need under one roof.','Rock music approaches at high velocity.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer", "q3_answer", "q4_answer", "q5_answer") VALUES ('46','13','2017-02-08','2','She advised him to come back at once.','Tom got a small piece of pie.','Yeah, I think it’s a good environment for learning English.','I want to buy a onesie… but know it won’t suit me.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer") VALUES ('28','14','2017-02-15','8','I love eating toasted cheese and tuna sandwiches.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer") VALUES ('31','14','2017-03-27','4','He ran out of money, so he had to stop playing poker.');
INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer") VALUES ('46','14','2017-04-05','2','Tom got a small piece of pie.');
