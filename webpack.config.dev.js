const webpack = require('webpack');
const path = require('path');
const cleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	devtool: 'source-map',
	entry: [
		'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&overlay=false',
		'./client/src/index'
	],
	output: {
		path: path.resolve(__dirname, 'client/dist'),
		publicPath: '/',
		filename: 'em.bundle.js'
	},
	mode: 'development',
	target: 'web',
	plugins: [
		new cleanWebpackPlugin(['client/dist']),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
    	new webpack.NoEmitOnErrorsPlugin()
	],
	module: {
		rules: [
			{
				test: /\.jsx?$/,
		        include: path.resolve(__dirname, 'client/src'),
		        exclude: /node_modules/,
		        loader: 'babel-loader',
		        options: {
		          	presets: ['es2015', 'react']
		        }
	    	},
	    	{
	    		test: /\.(jpe?g|png|svg|gif)$/i,
	    		loader: 'url-loader?name=[name].[ext]'
	    	},
	    	{
	    		test: /(\.css|\.scss|\.sass)$/, 
	    		loaders: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap']
	    	}
		]
	}
};