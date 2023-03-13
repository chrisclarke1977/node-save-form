// (A) LOAD MODULES
const path = require("path"),
      multer = require("multer"),
      bodyParser = require("body-parser"),
      express = require("express"),
      sqlite = require("sqlite3");

// (B) EXPRESS SERVER & MIDDLEWARE
const app = express();
app.use(multer().array());
app.use(bodyParser.urlencoded({ extended: false }));

// (C) SERVE DUMMY HTML FORM
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "/2-form.html")));


app.get("/emails", (req,res) => {
  let db = new sqlite.Database("dummy.db");
  let message = "Failed";

  let sql = `SELECT DISTINCT Email email FROM dummy
  ORDER BY email`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.log(err);
      res.status(200);
      res.send(message);
        }
    rows.forEach((row) => {
      console.log(row.email);
    });
    message = JSON.stringify(rows);
    
  res.status(200);
  res.send(message);
  });

});

app.get("/comments", (req,res) => {
  let db = new sqlite.Database("dummy.db");
  let message = "Failed";

  let sql = `SELECT Txt txt FROM dummy`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.log(err);
      res.status(200);
      res.send(message);
        }
    rows.forEach((row) => {
      console.log(row.txt);
    });
    message = JSON.stringify(rows);
    
  res.status(200);
  res.send(message);
  });

});

// (D) PROCESS SUBMITTED FORM
app.post("/go", (req, res) => {
  // (D1) SAVE INTO DATABASE
  let db = new sqlite.Database("dummy.db");
  let message = "Failed";

  db.run(`INSERT INTO dummy (email, txt) VALUES (?,?)`, [
    req.body.email, req.body.txt
  ], function (err) {
    if (err) { console.log(err);
      res.status(200);
  res.send(err); }
    else {
      message = `INSERTED - ID ${this.lastID}`;
      console.log(message);
      res.status(200);
      res.send(message);
    }
  });
  db.close();

  // (D2) RESPOND

});



// (E) START!
app.listen(8000, () => console.log(`Server running at port 8000`));