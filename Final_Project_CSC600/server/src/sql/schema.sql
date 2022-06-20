CREATE TABLE songs (
	id int NOT NULL PRIMARY KEY,
	song_title text NOT NULL,
	notes varchar NOT NULL,
	album varchar NOT NULL,
	artist varchar NOT NULL
);

INSERT INTO songs (id, song_title, notes, artist, album) 
VALUES (1, 'Ode to Joy (Dubstep Remix)', 'E4 E4 F4 G4 G4 F4 E4 D4 C4 C4 D4 E4 E4 D4 D4', 'W/e', 'W/e name');
INSERT INTO songs (id, song_title, notes, album, artist) 
VALUES (2, 'Its a Small World', 'E4 F4 G4 E5 C5 D5 C5 C5 B4 B4 C4 E4 F4 D5 B4 C5 B4 A4 G4 G4 E4 F4 G4 C5 D5 E5 D5 C5 A4 D5 E5 F5 E5 D5 G4 F5 E5 D5 C5', 'Richard M. Sherman and Robert B. Sherman', 'N/A');
INSERT INTO songs (id, song_title, notes, album, artist) 
VALUES (3, 'Animal Crossing Theme', 'A4 F4 D5 C5 A4 F4 D4 G4 F4 G4 A4 D5 E5 F5 C5 A4 F4 D5 C5 A4 F4 D4 G4 F4 G4 A4 D5 E5 F5 C5', 'Kazumi Totaka', 'N/A');
INSERT INTO songs (id, song_title, notes, album, artist) 
VALUES (4, 'Twinkle Twinkle Little Star', 'G4 G4 D5 D5 E5 E5 D5 C5 C5 B4 B4 A4 A4 G4 D5 D5 C5 C5 B4 B4 A4 D5 D5 C5 C5 B4 B4 A4 G4 G4 D5 D5 E5 E5 D5 C5 C5 B4 B4 A4 A4 G4', 'N/A', 'Nursery Rhymes');
INSERT INTO songs (id, song_title, notes, album, artist) 
VALUES (5, 'Spring', 'C5 E5 E5 E5 D5 C5 G5 G5 F5 E5 E5 E5 D5 C5 G5 G5 F5 E5 F5 G5 F5 E5 D5 B4 G4 C5 E5 E5 E5 D5 C5 G5 G5 F5 E5 E5 E5 D5 C5 G5 G5 F5 E5 F5 G5 F5 E5 D5 B4 G4', 'Antonio Vivaldi', 'N/A');