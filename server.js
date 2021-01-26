// Require necessary modules
const express = require("express");
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes")
const path = require("path");
const fs = require("fs");

//Initialize the app and create a dynamic port for heroku
const app = express();
const PORT = process.env.PORT || 3000;

// Set up body parsing, static, and route middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

// Start the server on the dynamic port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));