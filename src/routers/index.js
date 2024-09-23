const express = require("express");
const authRoutes = require("./authRoutes");
const user = require("./user");

const router = express();

router.use("/auth", authRoutes);
router.use("/users", user);

module.exports = router;
