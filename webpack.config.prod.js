const webpack = require('webpack');
const path = require('path');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
//const bundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    devtool: 'source-map',
    entry: [
        './client/src/index'
    ],
    output: {
        path: path.resolve(__dirname, 'server/public/dist'),
        publicPath: '/',
        filename: 'em.bundle.js'
    },
    mode: 'production',
    target: 'web',
    plugins: [
        new cleanWebpackPlugin(['server/public/dist']),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new miniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        //new bundleAnalyzerPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new htmlWebpackPlugin({
            template: 'server/index.html',
            inject: false
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
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: miniCssExtractPlugin.loader,
                        options: {
                            publicPath: 'server/public/dist',
                            hmr: process.env.NODE_ENV === 'development',
                        },
                    },
                    'css-loader?sourceMap',
                    'sass-loader?sourceMap'
                ],
            }
        ]
    }
};