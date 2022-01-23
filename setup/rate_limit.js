const rateLimit = require("express-rate-limit");

const interviews_limiter = rateLimit({
	max: 100,
	windowMs: 20 * 60 * 1000,
	message: "You sent too many 'interviews' requests! Try again in 20 minutes!"
});

const register_limiter = rateLimit({
	max: 100,
	windowMs: 20 * 60 * 1000,
	message: "You sent too many 'register' requests! Try again in 20 minutes!"
});

const likes_limiter = rateLimit({
	max: 1000,
	windowMs: 20 * 60 * 1000,
	message: "You sent too many 'likes' requests! Try again in 20 minutes!"
});

module.exports = {
	interviews_limiter: interviews_limiter,
	register_limiter: register_limiter,
	likes_limiter: likes_limiter,
}