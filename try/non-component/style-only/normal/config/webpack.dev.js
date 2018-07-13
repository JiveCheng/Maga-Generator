const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
    mode: 'development',
    module: {
        rules: [
            {
	            test: /\.css$|\.scss$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: process.env.NODE_ENV === 'development' ? false : true
                        }
                    },
                    {
                        loader:'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('autoprefixer')()
                            ]
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: '../',
        index: './preview.html',
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: './preview.html',
            template: './src/preview.html'
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
});