const sqlite3 = require("sqlite3").verbose();
const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);
const db = new sqlite3.Database("../public/PomodoroTimer.db");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

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
    });
  });
});

// Get users daily time spent on app by day
app.get("/userTime/:id", (req, res) => {
  db.serialize(() => {
    db.all(
      "SELECT timeType,sum(timeAmount) AS totalTime,strftime('%d-%m-%Y',createdOn,'unixepoch') AS formatTime FROM Time WHERE userID = ? GROUP BY timeType, formatTime",
      [req.params.id],
      (err, row) => {
        if (err) {
          res.send("Error encountered fetching data for user focus time");
          console.error(err.message);
        }
        res.send(row);
        // console.log("Successfully returned daily time spent on app focused");
      }
    );
  });
});
// create new user
app.post("/newUser/:name", (req, res) => {
  db.serialize(() => {
    db.run(
      "Insert INTO User (username,createdOn) VALUES (?, strftime('%s','now'))",
      [req.params.name],
      (err) => {
        if (err) {
          res.send("Error encountered when creating new user");
          console.error(err.message);
        }
        res.send("User Created Successfully");
        console.log("New User Created");
      }
    );
  });
});

// edit user
app.put("/editUser/:userid/:newname", (req, res) => {
  db.serialize(() => {
    db.run(
      "UPDATE User SET username = ? WHERE id = ?",
      [req.params.newname, req.params.userid],
      (err) => {
        if (err) {
          res.send("Error encountered while updating username");
          console.error(err.message);
        }
        res.send("User updated successfully");
        console.log("User updated");
      }
    );
  });
});
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
