const router = require("express").Router();
const { addUser } = require("../controllers/users");
const { signinValidator } = require("../middlewares/validation");

router.post("/", signinValidator, addUser);

module.exports = router;
