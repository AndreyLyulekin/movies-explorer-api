const router = require("express").Router();
const { getMeUser, editUserData } = require("../controllers/users");
const { editUserValidator } = require("../middlewares/validation");

router.get("/me", getMeUser);

router.patch("/me", editUserValidator, editUserData);

module.exports = router;
