const express = require("express");
const mongoose = require("mongoose");
const { databaseUrl } = require("./config/config");
const routes = require("./routers/index");
const connectToDatabase = require("./dbConnect/dbConnect");
// const routes = require("./routes");


const app = express();

app.use(express.json());
connectToDatabase(databaseUrl);

app.use("/", routes);


// mongoose
//   .connect(databaseUrl)
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.log("Database connection error:", err));

// Use the item routes
// app.use("/", routes);

module.exports = app;