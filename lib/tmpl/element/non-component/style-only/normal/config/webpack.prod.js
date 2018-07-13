const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    module: {
        rules: [
            {
	            test: /\.css$|\.scss$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].css",
                        },
                    },
                    {
                        loader: "extract-loader",
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    },
                    {
                        loader:'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('autoprefixer')(),
                                require('cssnano')({
                                    preset: 'default',
                                })
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
    plugins: [
        new HtmlWebpackPlugin({
            filename: './preview.html',
            template: './src/preview.html',
            inject: false,
            moduleStylePath: '<link href="./css.css" rel="stylesheet">'
        }),
        new FileManagerPlugin({
            onEnd: {
                delete: [
                    './dist/module.bundle.js'
                ]
            }
        })
    ]
});