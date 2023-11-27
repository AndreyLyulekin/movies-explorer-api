const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator(url) {
          validator.isUrl(url);
        },
        message: "Проверьте корректность URL",
      },
    },
    trailerLink: {
      type: String,
      required: true,
      validate: {
        validator(url) {
          validator.isUrl(url);
        },
        message: "Проверьте корректность URL",
      },
    },
    thumbnail: {
      type: String,
      required: true,
      validate: {
        validator(url) {
          validator.isUrl(url);
        },
        message: "Проверьте корректность URL",
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    nameRU: {
      type: String,
      required: true,
    },
    nameEN: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("movie", movieSchema);
