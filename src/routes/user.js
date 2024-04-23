const { User } = require("../handlers");
const router = require("express").Router();
const handler = new User();

router.post("/", handler.signup);
router.post("/login", handler.login);

module.exports = router;
