const path = require("path");
const fs = require("fs");


module.exports = function (app) {

    app.get("/api/notes", function (req, res) {
        res.sendFile(path.join(__dirname, "../db/db.json"));
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
};