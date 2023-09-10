module.exports = {
	apps : [
		{
			name: 'healthhunt',
			script: './.output/server/index.mjs',
			env: {
				'PORT': 3020,
				'NODE_ENV': 'production'
			}
		}
	]
};
