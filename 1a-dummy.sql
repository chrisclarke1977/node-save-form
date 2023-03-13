CREATE TABLE dummy (
  id INTEGER,
  email TEXT NOT NULL,
  txt TEXT NOT NULL,
  PRIMARY KEY("id" AUTOINCREMENT)
);

CREATE TABLE leads (
	id integer PRIMARY KEY,
	first_name text NOT NULL,
	last_name text NOT NULL,
	phone text NOT NULL,
	email text NOT NULL,
	source text NOT NULL,
  PRIMARY KEY("id" AUTOINCREMENT)
);