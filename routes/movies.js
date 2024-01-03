const router = require("express").Router();

const { getMovies, addMovie, deleteMovie } = require("../controllers/movies");
const {
  createMovieValidator,
  deleteMovieValidator,
} = require("../middlewares/validation");

router.get("/", getMovies);

router.post("/", createMovieValidator, addMovie);

router.delete("/:movieId", deleteMovieValidator, deleteMovie);

module.exports = router;
