const express = require("express");
const app = express();
const fs = require("fs");

var user = {
  user4: {
    name: "mohit",
    password: "password4",
    profession: "teacher",
    id: 4,
  },
};

app.get("/users", function (req, res) {
  fs.readFile(__dirname + "/db/" + "users.json", "utf8", function (err, data) {
    console.log(data);
    res.end(data);
  });
});

app.get("user/:id", function (req, res) {
  // First read existing users.
  fs.readFile(__dirname + "/db/" + "users.json", "utf8", function (err, data) {
    var users = JSON.parse(data);
    var user = users["user" + req.params.id];
    console.log(user);
    res.end(JSON.stringify(user));
  });
});

app.post("/user/create", function (req, res) {
  // First read existing users.
  fs.readFile(__dirname + "/db/" + "users.json", "utf8", function (err, data) {
    data = JSON.parse(data);
    data["user4"] = user["user4"];

    fs.writeFile(__dirname + "/db/" + "users.json", JSON.stringify(data), function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    });

    res.end(JSON.stringify(data));
  });
});

app.delete("/user/:id/delete", function (req, res) {
  // First read existing users.
  fs.readFile(__dirname + "/db/" + "users.json", "utf8", function (err, data) {
    data = JSON.parse(data);
    delete data["user" + req.params.id];
    
    fs.writeFile(__dirname + "/db/" + "users.json", JSON.stringify(data), function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    });

    res.end(JSON.stringify(data));
  });
});

var server = app.listen(50053, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});
