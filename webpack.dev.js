const merge = require('webpack-merge')
const common = require('./webpack.common')
const webpack = require('webpack')
module.exports = merge(common, {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        proxy: {
            '/api':{
                target:'http://localhost:8088',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
        index:"./view/index.html",
        contentBase: './dist',
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
})

