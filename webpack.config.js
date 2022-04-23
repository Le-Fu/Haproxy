const path = require('path')
const glob = require('glob')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

function genHtmlPluginConfig(entry) {
    return new HtmlWebpackPlugin({
        template: `./public/${entry}.html`,
        chunks: [entry],
        filename: `${entry}.html`
    })
}

function genMutiPageConfig() {
    let entry = {}
    let plugins = []
    let filePathList = glob.sync('./src/pages/*/index.js')
    let re = /src\/pages\/(.+)\/index\.js/
    if (Array.isArray(filePathList)) {
        filePathList.map(pathItem => {
            let res = pathItem.match(re)
            if (Array.isArray(res)) {
                let entryName = res[1]
                entry[entryName] = pathItem
                let isExist = fs.existsSync(`./public/${entryName}.html`)
                if (isExist) {
                    plugins.push(genHtmlPluginConfig(entryName))
                }
            }
        })
    }

    return {
        entry,
        plugins
    }
}

const { entry, plugins: HtmlWebpackPlugins } = genMutiPageConfig()

module.exports = {
    mode: 'development',
    entry,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },
    // optimization: {
    //     splitChunks: {
    //         chunks: 'all',
    //     },
    // },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "less-loader",
                }]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                { from: './src/*.json', to: '[name][ext]' },
                { from: './src/assets/*.png', to: 'assets/[name][ext]' }
            ]
        })
    ].concat(HtmlWebpackPlugins)
}