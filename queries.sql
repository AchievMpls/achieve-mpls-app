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
  "program" varchar(40) CHECK ("program" = 'Freshmen' OR "program" = 'Seniors' OR "program" = null),
  CONSTRAINT only_one_per_list UNIQUE ("email")
);

-- DO NOT RUN THE BELOW CODE.
-- First, find all for 'ypaulsussman' and replace with your personal Gmail address.
-- If you don't do this, I'll get hundreds of alerts at my inbox, and later have to kill you.
-- Now you can run the code. ^_^
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "program") VALUES ('Sung','Slama','ypaulsussman+1@gmail.com','Slama25','coach','Seniors');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "program") VALUES ('Leah','Largo','ypaulsussman+2@gmail.com','Largo72','coach','Seniors');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "program") VALUES ('Georgina','Grieb','ypaulsussman+3@gmail.com','Grieb91','coach','Seniors');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "program") VALUES ('Danna','Dawes','ypaulsussman+4@gmail.com','Dawes64','coach','Seniors');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "program") VALUES ('Ayanna','Amundsen','ypaulsussman+5@gmail.com','Amundsen85','coach','Freshmen');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "program") VALUES ('Yukiko','Yarbrough','ypaulsussman+6@gmail.com','Yarbrough54','coach','Freshmen');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "program") VALUES ('Klara','Keele','ypaulsussman+7@gmail.com','Keele42','coach','Seniors');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "program") VALUES ('Clora','Collado','ypaulsussman+8@gmail.com','Collado24','coach','Seniors');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "program") VALUES ('Autumn','Arambula','ypaulsussman+9@gmail.com','Arambula27','coach','Freshmen');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "program") VALUES ('Chi','Crider','ypaulsussman+10@gmail.com','Crider2','coach','Seniors');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "program") VALUES ('Shondra','Shankle','ypaulsussman+11@gmail.com','Shankle83','coach','Freshmen');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "program") VALUES ('Moriah','Macke','ypaulsussman+12@gmail.com','Macke76','coach','Seniors');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "program") VALUES ('Alison','Adamski','ypaulsussman+13@gmail.com','Adamski70','coach','Seniors');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "program") VALUES ('Cathey','Carney','ypaulsussman+14@gmail.com','Carney57','coach','Seniors');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "program") VALUES ('Agripina','Apgar','ypaulsussman+15@gmail.com','Apgar67','coach','Freshmen');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "program") VALUES ('Cicely','Cram','ypaulsussman+16@gmail.com','Cram88','coach','Seniors');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "program") VALUES ('Andrew','Andrews','ypaulsussman+17@gmail.com','Andrews80','coach','Freshmen');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "program") VALUES ('Alita','Arambula','ypaulsussman+18@gmail.com','Arambula7','coach','Seniors');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "program") VALUES ('Mauricio','Mcglown','ypaulsussman+19@gmail.com','Mcglown16','coach','Freshmen');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "program") VALUES ('Page','Pastor','ypaulsussman+20@gmail.com','Pastor23','coach','Seniors');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "program") VALUES ('Deetta','Dority','ypaulsussman+21@gmail.com','Dority21','coach','Seniors');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "program") VALUES ('Damion','Dupler','ypaulsussman+22@gmail.com','Dupler5','coach','Seniors');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "program") VALUES ('Geri','Getty','ypaulsussman+23@gmail.com','Getty29','coach','Freshmen');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "program") VALUES ('Charita','Cybulski','ypaulsussman+24@gmail.com','Cybulski23','coach','Seniors');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "program") VALUES ('Huong','Hoeft','ypaulsussman+25@gmail.com','Hoeft67','coach','Freshmen');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "program") VALUES ('Hollis','Hannold','ypaulsussman+26@gmail.com','Hannold20','coach','Seniors');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "program") VALUES ('Cecilia','Carberry','ypaulsussman+27@gmail.com','Carberry14','coach','Freshmen');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "program") VALUES ('Hilaria','Hauser','ypaulsussman+28@gmail.com','Hauser62','coach','Seniors');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "program") VALUES ('Fletcher','Flett','ypaulsussman+29@gmail.com','Flett53','coach','Seniors');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "program") VALUES ('Lyman','Lucarelli','ypaulsussman+30@gmail.com','Lucarelli67','coach','Freshmen');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "program") VALUES ('Oretha','Oglesby','ypaulsussman+31@gmail.com','Oglesby19','coach','Freshmen');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "program") VALUES ('Annabell','Averett','ypaulsussman+32@gmail.com','Averett87','coach','Freshmen');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "program") VALUES ('Rolf','Rosenbaum','ypaulsussman+33@gmail.com','Rosenbaum93','coach','Seniors');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "program") VALUES ('Lucinda','Linehan','ypaulsussman+34@gmail.com','Linehan1','coach','Seniors');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "program") VALUES ('Dorethea','Doster','ypaulsussman+35@gmail.com','Doster54','coach','Freshmen');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "program") VALUES ('Michal','Meese','ypaulsussman+36@gmail.com','Meese58','coach','Seniors');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "program") VALUES ('Dollie','Durney','ypaulsussman+37@gmail.com','Durney29','coach','Freshmen');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "program") VALUES ('Adrien','Alderson','ypaulsussman+38@gmail.com','Alderson10','coach','Seniors');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "program") VALUES ('Beth','Bergman','ypaulsussman+39@gmail.com','Bergman27','coach','Freshmen');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "program") VALUES ('William','Wilber','ypaulsussman+40@gmail.com','Wilber78','coach','Seniors');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "program") VALUES ('Marisha','Monger','ypaulsussman+41@gmail.com','Monger90','coach','Seniors');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "program") VALUES ('Laticia','Lapp','ypaulsussman+42@gmail.com','Lapp78','coach','Freshmen');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "program") VALUES ('Lenard','Larkin','ypaulsussman+43@gmail.com','Larkin68','coach','Freshmen');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "program") VALUES ('Kristy','Kinyon','ypaulsussman+44@gmail.com','Kinyon77','coach','Seniors');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "program") VALUES ('Meaghan','Mendivil','ypaulsussman+45@gmail.com','Mendivil87','coach','Seniors');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "program") VALUES ('Selina','Santana','ypaulsussman+46@gmail.com','Santana98','coach','Seniors');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "program") VALUES ('Carli','Council','ypaulsussman+47@gmail.com','Council68','coach','Freshmen');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "program") VALUES ('Mariella','Monzon','ypaulsussman+48@gmail.com','Monzon45','admin','');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "program") VALUES ('Theresia','Tuner','ypaulsussman+49@gmail.com','Tuner27','admin','');
INSERT INTO "users" ("fname", "lname", "email", "password", "role", "program") VALUES ('Herman','Harshbarger','ypaulsussman+50@gmail.com','Harshbarger55','admin','');
