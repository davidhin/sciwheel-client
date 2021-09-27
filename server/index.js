const path = require("path");
const express = require("express");
const app = express(); // create express app
const mongoose = require("mongoose");
const cors = require("cors");

var routes = require("./routes");

// add middleware - react
app.use(express.static(path.join(__dirname, "..", "build")));

// json middleware
app.use(express.json());

// cors
app.use(cors());

// mongodb
mongoose.connect("mongodb://mongodb:27017/test", { useNewUrlParser: true });

// If there is a connection error send an error message
mongoose.connection.on("error", (error) => {
  console.log("Database connection error:", error);
  databaseConnection = "Error connecting to Database";
});

// If connected to MongoDB send a success message
mongoose.connection.once("open", () => {
  console.log("Connected to Database!");
  databaseConnection = "Connected to Database";
});

app.use("/", routes);

// start express server on port 5000
app.listen(process.env.PORT || 5000);
