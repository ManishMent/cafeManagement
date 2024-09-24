const express = require("express");
const authRoutes = require("./authRoutes");
const user = require("./user");
const category = require("./category");
const item = require("./item");

const router = express();

router.use("/auth", authRoutes);
router.use("/users", user); // No needed remove it after the stablity 
router.use("/categories", category);
router.use('/items', item);

module.exports = router;
