const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");

const { getMovies, addMovie, deleteMovie } = require("../controllers/movies");

const urlValidation =
  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

router.get("/movies", getMovies);

router.post(
  "/movies",
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().pattern(urlValidation),
      trailerLink: Joi.string().required().pattern(urlValidation),
      thumbnail: Joi.string().required().pattern(urlValidation),
      movieId: Joi.string().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  }),
  addMovie
);

router.get(
  "/movies/:_id",
  celebrate({
    params: Joi.object().keys({
      movieId: Joi.string().required(),
    }),
  }),
  deleteMovie
);

module.exports = router;
