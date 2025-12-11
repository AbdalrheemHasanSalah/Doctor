CREATE TABLE IF NOT EXISTS patients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    age INTEGER,
    fee REAL,
    next_appointment TEXT,
    condition TEXT,
    medications TEXT
);
