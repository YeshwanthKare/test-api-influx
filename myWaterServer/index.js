const express = require("express");
const cors = require("cors");
const influx = require("./config/database");
const dotenv = require("dotenv");

dotenv.config();

// Create global app object
const app = express();

app.use(cors());

// Normal express config defaults
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(require("method-override")());
app.use(express.static(__dirname + "/public"));

app.use(require("./routes"));

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Error handlers
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening at ${server.address().port}`);
});
