module.exports = {
	apps: [{
		name: "csc309-server",
		script: "./app.js",
		env: {
			NODE_ENV: "development",
		},
		env_production: {
			NODE_ENV: "production",
		}
	}]
}