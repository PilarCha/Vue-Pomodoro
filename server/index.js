const sqlite3 = require("sqlite3").verbose();
const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);
const db = new sqlite3.Database("../public/PomodoroTimer.db");

// db.run('CREATE TABLE IF NOT EXISTS')
