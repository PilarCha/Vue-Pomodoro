const sqlite3 = require("sqlite3").verbose();
const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);
const db = new sqlite3.Database("../public/PomodoroTimer.db");

// db.run('CREATE TABLE IF NOT EXISTS')
app.get("/getAllUsers", (req, res) => {
  db.serialize(() => {
    db.all("SELECT id,username FROM User", (err, rows) => {
      if (err) {
        res.send("Error encountered fetching the data");
        console.error(err.message);
      }
      res.json(rows);
      console.log(rows);
      console.log("Reached GetAllUsers");
    });
  });
});

server.listen(4000, function () {
  console.log("Server Listening on port:4000");
});
