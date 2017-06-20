var HTMLWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
	template: __dirname+'/index.html',
	filename: 'index.html',
	inject: 'body'
});

module.exports = {
	entry: __dirname + '/index.js',

	module: {
		loaders: [
		{
			test: /\.js$/,
		    exclude: /node_modules/,
		    loader: 'babel-loader'
		},
			{
                test: /\.(?:png|jpg|svg)$/,
                loader: 'url-loader',
				query: {
                	limit: 10000
				}
            }
		]
	},
	output: {
		filename: 'bundle.js',
		path: __dirname+'/build'
	},
	plugins: [HTMLWebpackPluginConfig]
};
