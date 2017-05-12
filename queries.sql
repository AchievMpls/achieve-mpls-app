-- Open postico, and connect to your local.
-- Create a new database (I titled mine 'achieveDB').
-- Open 'achieveDB'.
-- Open 'SQL Query', and run the following:

CREATE TABLE "users" (
  "id" serial primary key,
  "fname" varchar(80) not null,
  "lname" varchar(80) not null,
  "email" varchar(80) not null,
  "password" varchar(120) not null,
  "role" varchar(40) not null DEFAULT 'coach' CHECK ("role" = 'coach' OR "role" = 'admin'),
  -- @TODO: we will need to update the line below to be a REFERENCES statement joining on the session table
  "session_id" integer DEFAULT null,
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
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "session_id") VALUES ('Mariella','Monzon','ypaulsussman+48@gmail.com','Monzon45','admin', null);
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "session_id") VALUES ('Theresia','Tuner','ypaulsussman+49@gmail.com','Tuner27','admin', null);
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "session_id") VALUES ('Herman','Harshbarger','ypaulsussman+50@gmail.com','Harshbarger55','admin', null);
