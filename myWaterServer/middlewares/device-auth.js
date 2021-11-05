const dotenv = require("dotenv");

dotenv.config();

const deviceValidation = async (req, res, next) => {
  try {
    const deviceToken = req.query.token;
    if (deviceToken !== process.env.DEVICE_TOKEN) {
      return res.sendStatus(401);
    }
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = deviceValidation;