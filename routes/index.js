const router = require("express").Router();
const usersRouter = require("./users");
const signupRouter = require("./signup");
const signinRouter = require("./signin");
const auth = require("../middlewares/auth");

router.use("/signup", signupRouter);
router.use("/signin", signinRouter);
router.use(auth);
router.use("/users", usersRouter);

module.exports = router;
