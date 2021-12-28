const jwt = require("jsonwebtoken");
var ObjectId = require("mongodb").ObjectId;
const validator = require("validator");

module.exports.validateUser = (req, res, next) => {
  const validEmail = validator.isEmail(req.body.email);
  const validPassword = validator.isStrongPassword(req.body.password, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 0,
  });
  const validName = req.body.name.length > 0;

  if (validEmail && validPassword && validName) {
    next();
  } else {
    return res.status(400).send({
      message: "invalid user entry",
    });
  }
};

module.exports.isLoggedIn = (req, res, next) => {
  try {
    const cookie = req.cookies["jwt"];

    const claims = jwt.verify(cookie, process.env.SECRET);
    if (!claims) {
      //where cookie is invalid
      return res.status(401).send({
        message: "Unauthenticated",
      });
    } else {
      next();
    }
  } catch (error) {
    //where no cookie at all
    return res.status(401).send({
      message: "unauthenticated",
    });
  }
};
