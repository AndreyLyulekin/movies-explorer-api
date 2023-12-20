require("dotenv").config();

const mongoose = require("mongoose");
const httpConstants = require("http2").constants;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const BadRequestError = require("../errors/BadRequest");
const NotFoundError = require("../errors/NotFound");
const ConflictError = require("../errors/Conflict");

const { JWT_SECRET } = process.env;

module.exports.editUserData = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      throw new NotFoundError("Пользователь с указанным id не найден");
    })
    .then((user) => res.status(httpConstants.HTTP_STATUS_OK).send(user))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError("Пользователь с указанным email уже зарегистрирован в системе"));
      } else if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

module.exports.getMeUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.status(httpConstants.HTTP_STATUS_OK).send(user))
    .catch(next);
};

module.exports.addUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }).then((user) => res.status(httpConstants.HTTP_STATUS_CREATED).send({
      name: user.name,
      _id: user._id,
      email: user.email,
    })))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError("Пользаватель уже зарегистрирован"));
      } else if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.status(httpConstants.HTTP_STATUS_OK).send({ token });
    })
    .catch((err) => {
      next(err);
    });
};
