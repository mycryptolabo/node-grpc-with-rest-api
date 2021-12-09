const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require("fs");
const client = require("./client");

// parse an HTML body into a string
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ xtended: true }));

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
    res.setHeader("Content-Type", "application/json");
    res.end(data);
  });
});

app.get("user/:id", function (req, res) {
  // First read existing users.
  fs.readFile(__dirname + "/db/" + "users.json", "utf8", function (err, data) {
    var users = JSON.parse(data);
    var user = users["user" + req.params.id];

    console.log(user);
    res.setHeader("Content-Type", "application/json");
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

    res.setHeader("Content-Type", "application/json");
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

    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data));
  });
});

// get all news
app.get("/news", function (req, res) {
  client.getAllNews({}, (error, news) => {
    if (error) throw error;

    console.log(news);
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(news));
  });
});

// get news
app.get("/news/:id", function (req, res) {
  client.getNews({ id: req.params.id }, (error, news) => {
    if (error) throw error;

    console.log("News feched successfully!\n", news);
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(news));
  });
});

// add a news
app.post("/news/create", function (req, res) {
  client.addNews(
    {
      id: req.body.id,
      title: req.body.title,
      body: req.body.body,
      postImage: req.body.postImage,
    },
    (error, news) => {
      if (error) throw error;

      res.setHeader("Content-Type", "application/json");
      console.log("Successfully created a news.");
      res.end(JSON.stringify(news));
    }
  );
});

// edit a news
app.post("/news/:id/edit", function (req, res) {
  client.editNews(
    {
      id: req.params.id,
      title: req.body.title,
      body: req.body.body,
      postImage: req.body.postImage,
    },
    (error, news) => {
      if (error) throw error;

      console.log("Successfully edited a news.");
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(news));
    }
  );
});

// delete a news
app.delete("/news/:id/delete", function (req, res) {
  client.deleteNews({ id: req.params.id }, (error, news) => {
    if (error) throw error;

    console.log("Successfully deleted a news item.");
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(news));
  });
});

var server = app.listen(50053, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});
