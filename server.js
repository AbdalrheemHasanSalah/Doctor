import express from "express";
import bodyParser from "body-parser";
import sqlite3 from "sqlite3";
import fs from "fs";

const app = express();
const db = new sqlite3.Database("database.sqlite");

// Initialize DB from SQL file
const initSQL = fs.readFileSync("init_db.sql", "utf8");
db.exec(initSQL);

app.use(bodyParser.json());
app.use(express.static("public"));

// Get all patients
app.get("/patients", (req, res) => {
  db.all("SELECT * FROM patients", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Add or update a patient
app.post("/save", (req, res) => {
  const { id, name, age, fee, next_appointment, condition, medications } = req.body;

  if (id) {
    db.run(
      `UPDATE patients
       SET name=?, age=?, fee=?, next_appointment=?, condition=?, medications=?
       WHERE id=?`,
      [name, age, fee, next_appointment, condition, medications, id],
      function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, updated: this.changes });
      }
    );
  } else {
    db.run(
      `INSERT INTO patients (name, age, fee, next_appointment, condition, medications)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, age, fee, next_appointment, condition, medications],
      function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, id: this.lastID });
      }
    );
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
