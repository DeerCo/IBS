const rateLimit = require("express-rate-limit");

const general_limiter = rateLimit({
	max: 2000,
	windowMs: 60 * 60 * 1000,
	message: "You sent too many requests! Try again in one hour!"
});

const token_limiter = rateLimit({
	max: 2,
	windowMs: 60 * 60 * 1000,
	message: "You sent too many 'token' requests! Try again in one hour!"
});

const interviews_limiter = rateLimit({
	max: 2,
	windowMs: 60 * 60 * 1000,
	message: "You sent too many 'interviews' requests! Try again in one hour!"
});

const register_limiter = rateLimit({
	max: 200,
	windowMs: 60 * 60 * 1000,
	message: "You sent too many 'register' requests! Try again in one hour!"
});

const likes_limiter = rateLimit({
	max: 2000,
	windowMs: 60 * 60 * 1000,
	message: "You sent too many 'likes' requests! Try again in one hour!"
});

module.exports = {
	general_limiter: general_limiter,
	token_limiter: token_limiter,
	interviews_limiter: interviews_limiter,
	register_limiter: register_limiter,
	likes_limiter: likes_limiter,
}