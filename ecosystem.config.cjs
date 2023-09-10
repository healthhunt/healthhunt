require('dotenv/config');

module.exports = {
	apps : [
		{
			name: 'healthhunt',
			script: './.output/server/index.mjs',
			env: {
				PORT: 3020,
				NODE_ENV: 'production',
				SECRET: process.env.SECRET,
				DATABASE_URL: process.env.DATABASE_URL,
				OPENAI_API_KEY: process.env.OPENAI_API_KEY,
				ORIGIN: process.env.ORIGIN,
			}
		}
	]
};
