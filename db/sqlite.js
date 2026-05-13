const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./pizzeria.db");
db.run(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario TEXT,
    password TEXT
  )
`);

module.exports = db;