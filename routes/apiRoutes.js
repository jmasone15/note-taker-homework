const path = require("path");
const fs = require("fs");


module.exports = function (app) {

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
    });
};