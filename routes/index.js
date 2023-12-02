const router = require("express").Router();
const usersRouter = require("./users");
const moviesRouter = require("./movies");
const auth = require("../middlewares/auth");
const { login } = require("../controllers/users");
const { addUser } = require("../controllers/users");
const { signinValidator } = require("../middlewares/validation");
const { signUpValidator } = require("../middlewares/validation");
const NotFoundError = require("../errors/NotFound");

router.post("/signin", signinValidator, login);
router.post("/signup", signUpValidator, addUser);

router.use(auth);

router.use("/users", usersRouter);
router.use("/movies", moviesRouter);

router.use("*", (req, res, next) => {
  next(new NotFoundError("Страница не найдена"));
});

module.exports = router;
