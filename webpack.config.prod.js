const webpack = require('webpack');
const path = require('path');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'eval-source-map',
    entry: [
        './client/src/index'
    ],
    output: {
        path: path.resolve(__dirname, 'client/dist'),
        publicPath: '/',
        filename: 'em.bundle.js'
    },
    mode: 'production',
    target: 'web',
    plugins: [
        new cleanWebpackPlugin(['client/dist']),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new htmlWebpackPlugin({
            template: 'client/index.html'
        })
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