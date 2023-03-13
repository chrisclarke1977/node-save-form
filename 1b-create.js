// (A) REQUIRED MODULES
const fs = require("fs"),
      sqlite = require("sqlite3");

// (B) CREATE DUMMY DATABASE
const db = new sqlite.Database("dummy.db", err => {
  if (err) { console.log(err); }
  else {
    db.exec(fs.readFileSync("1a-dummy.sql", "utf8"));
    db.close();
    console.log("Database created");
  }
});