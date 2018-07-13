const path = require('path');

module.exports = {
    entry: {
        'module': './src/module.entry.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, '../dist/')
    },
    module: {
        rules: [
            {
                test: /\.png$|\.gif$|\.jpg$|\.eot$|\.ttf$|\.svg$|\.woff$/,
                use: [
                    {
        				loader: 'file-loader',
        				options: {
        					name: '[name].[ext]',
        					outputPath: './assets/'
        				}
        			}
                ]
            }
        ]
    },
    plugins: []
};