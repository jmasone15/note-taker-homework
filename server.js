// Require necessary modules
const express = require("express");
// const apiRoutes = require("./routes/apiRoutes");
// const htmlRoutes = require("./routes/htmlRoutes");
const path = require("path");
const fs = require("fs");

//Initialize the app and create a dynamic port for heroku
const app = express();
const PORT = process.env.PORT || 3000;

// Set up body parsing, static, and route middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// app.use("/api", apiRoutes);
// app.use("*", htmlRoutes);

// require("./routes/apiRoutes")(app);
// require("./routes/htmlRoutes")(app);

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./db/db.json"));
});

app.post("/api/notes", function (req, res) {
    res.json(fs.writeFile("./db/db.json", `[ ${JSON.stringify(req.body)} ]`, 'utf-8', function (err) {
        if (err) throw err;
        console.log(req.body);
        console.log("Note Saved!");
    }));
});

app.delete("/api/notes/:id", function (req, res) {
    res.json(fs.writeFile("./db/db.json", JSON.stringify(req.body), 'utf-8', function (err) {
        if (err) throw err;
        console.log(req.body);
        console.log("Note Deleted!");
    }));
});

// Start the server on the dynamic port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}...`));

