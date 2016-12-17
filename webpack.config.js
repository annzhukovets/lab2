var config = {
	entry: './js/script.js',
	output: {
		filename: './bundle.js',
		libraryname: 'football'
	},
	module: {
		loaders: [
		    {
			    test: /\.js$/,
			    exclude: /(node_modules|bower_components)/,
			    loader: 'babel-loader',
			    query: {
				    presets: ['es2015']
			    }
		    }
		]
	}
}

module.exports = config;