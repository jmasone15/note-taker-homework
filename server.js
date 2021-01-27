// Require necessary modules
const express = require("express");
// const apiRoutes = require("./routes/apiRoutes");
// const htmlRoutes = require("./routes/htmlRoutes");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

//Initialize the app and create a dynamic port for heroku
const app = express();
const PORT = process.env.PORT || 3000;
const db = "./db/db.json"

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

    fs.readFile(path.join(__dirname, db), function (err, data) {
        if (err) throw err;
        return res.json(JSON.parse(data));
    });

});

app.post("/api/notes", function (req, res) {

    fs.readFile(path.join(__dirname, db), function (err, data) {
        if (err) throw err;
        let userInput = JSON.parse(data);
        userInput.push(req.body)
        req.body.id = uuidv4();


        res.json(fs.writeFile(db, JSON.stringify(userInput), function (err) {
            if (err) throw err;
            console.log(userInput);
            console.log("Note Created!");
        }));

    });
});

app.delete("/api/notes/:id", function (req, res) {

    fs.readFile(path.join(__dirname, db), function (err, data) {
        if (err) throw err;
        noteId = req.params.id
        userInput = JSON.parse(data);
        userInput = userInput.filter(({ id }) => id !== req.params.id);



        res.json(fs.writeFile(db, JSON.stringify(userInput), function (err) {
            if (err) throw err;
            console.log(userInput);
            console.log("Note Deleted!");
        }));
    });

});


// Start the server on the dynamic port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}...`));

