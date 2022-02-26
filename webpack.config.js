const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
        popup: './src/popup.js',
        options: './src/options.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './public/popup.html',
            chunks: ['popup'],
            filename: 'popup.html'
        }),
        new HtmlWebpackPlugin({
            template: './public/options.html',
            chunks: ['options'],
            filename: 'options.html'
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: './src/*.json', to: '[name][ext]' },
                { from: './src/background.js', to: '[name][ext]' },
                { from: './src/assets/*.png', to: 'assets/[name][ext]' }
            ]
        })
    ]
}