// Database Setup
const { Pool } = require("pg");

const client = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false
	}
});
client.connect();

module.exports = client;