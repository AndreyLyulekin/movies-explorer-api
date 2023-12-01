const mongoose = require("mongoose");
const httpConstants = require("http2").constants;

const Movie = require("../models/movie");
const BadRequestError = require("../errors/BadRequest");
const NotFoundError = require("../errors/NotFound");
const ForbiddenError = require("../errors/Forbidden");

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.status(httpConstants.HTTP_STATUS_OK).send(movies))
    .catch(next);
};

module.exports.addMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.status(httpConstants.HTTP_STATUS_OK).send(movie))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.cardId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError("Фильм не найден");
      }
      if (!movie.owner.equals(req.user._id)) {
        throw new ForbiddenError("Нет доступа для удаления карточки");
      }
      Movie.deleteOne(movie)
        .then(() => {
          res
            .status(httpConstants.HTTP_STATUS_OK)
            .send({ message: "Фильм удалён" });
        })
        .catch((err) => {
          if (err instanceof mongoose.Error.DocumentNotFoundError) {
            next(new NotFoundError("Фильм не найден"));
          } else {
            next(err);
          }
        });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError("Переданы некорректные данные"));
      } else {
        next(err);
      }
    });
};
