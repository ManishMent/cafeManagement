const express = require("express");
const authRoutes = require("./authRoutes");
const user = require("./user");
const category = require("./category");
const item = require("./item");
const table = require("./table");
const order = require("./order");

const router = express();

router.use("/auth", authRoutes);
router.use("/users", user); // No needed remove it after the stablity
router.use("/categories", category);
router.use("/items", item);
router.use("/tables", table);
router.use("/orders", order);

module.exports = router;
