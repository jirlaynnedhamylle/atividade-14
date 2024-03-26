const sqlite3 = require('sqlite3').verbose();

// Abre a conexão com o banco de dados
const db = new sqlite3.Database('./database.db');

// Cria a tabela de usuários se não existir
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    password TEXT
)`);

module.exports = db;
