const rateLimit = require("express-rate-limit");

const general_limiter = rateLimit({
  max: 10000000,
  windowMs: 60 * 60 * 1000,
  message: "You sent too many requests! Try again in one hour!",
});

const email_limiter = rateLimit({
  max: 20000,
  windowMs: 60 * 60 * 1000,
  message: "You sent too many requests! Try again in one hour!",
});

module.exports = {
  general_limiter: general_limiter,
  email_limiter: email_limiter,
};
