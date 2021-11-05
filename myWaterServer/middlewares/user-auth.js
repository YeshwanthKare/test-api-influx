const dotenv = require("dotenv");

dotenv.config();

const userValidation = async (req, res, next) => {
  try {
    const userToken = req.headers.authorization;
    if (userToken !== process.env.USER_TOKEN) {
      return res.sendStatus(401);
    }
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = userValidation;
