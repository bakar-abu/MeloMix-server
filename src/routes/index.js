const router = require("express").Router();
const user = require("./user");
const songs = require("./songs");

router.use("/user", user);
router.use("/songs", songs);

module.exports = { router };
