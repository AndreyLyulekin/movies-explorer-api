const router = require("express").Router();
const { login } = require("../controllers/users");
const { signinValidator } = require("../middlewares/validation");

router.post("/", signinValidator, login);

module.exports = router;
