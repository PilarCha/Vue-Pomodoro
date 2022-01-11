const sqlite3 = require("sqlite3").verbose();
const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);
const db = new sqlite3.Database("../public/PomodoroTimer.db");

// db.run('CREATE TABLE IF NOT EXISTS')
// get all Users
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

// Get users daily time spent on app by day
app.get("/userTime/:id", (req, res) => {
  db.serialize(() => {
    db.each(
      "SELECT timeType,sum(timeAmount) AS totalTime,strftime('%d-%m-%Y',createdOn,'unixepoch') AS formatTime FROM Time WHERE userID = ? GROUP BY timeType, formatTime",
      [req.params.id],
      (err, row) => {
        if (err) {
          res.send("Error encountered fetching data for user focus time");
          console.error(err.message);
        }
        res.send(
          ` timeType: ${row.timeType}, totalTime: ${row.TotalTime}, formatTime: ${row.FormatTime}`
        );
        console.log("Successfully returned daily time spent on app focused");
      }
    );
  });
});
// create new user

// edit user

// delete 1 user
app.delete("/delete/:id", (req, res) => {
  db.serialize(() => {
    db.run("Delete from User WHERE id = ?", [req.params.id], (err) => {
      if (err) {
        res.send("Error encountered while deleting user");
        console.error(err.message);
      }
      res.send("Entry Deleted Successfully");
      console.log("Entry Deleted");
    });
  });
});

server.listen(4000, function () {
  console.log("Server Listening on port:4000");
});
