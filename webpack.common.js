const path = require('path')
const miniCssExtractPlugin = require("mini-css-extract-plugin")
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
// 获取htmlconfig 参数
let getHtmlConfig = function (name,title) {
    return {
        template: "./src/view/" + name + ".html",
        title:title,
        filename: "view/" + name + ".html",
        inject: true,
        hash: true,
        chunks: ['common', name]
    }
}
// webpack config common
module.exports = {
    entry: {
        'common': ['./src/page/common/index.js'],
        'index': ['./src/page/index/index.js'],
        'user-login': ['./src/page/user-login/index.js'],
        'user-register': ['./src/page/user-register/index.js'],
        'user-pass-reset': ['./src/page/user-pass-reset/index.js'],
        'user-pass-update': ['./src/page/user-pass-update/index.js'],
        'user-center': ['./src/page/user-center/index.js'],
        'user-center-update': ['./src/page/user-center-update/index.js'],
        'result': ['./src/page/result/index.js']
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    externals: {
        'jquery': 'window.jQuery'
    },
    module: {
        rules: [
            { test: /\.css$/, use: [miniCssExtractPlugin.loader, 'css-loader'] },
            { test: /\.string$/, use: [ 'html-loader'] },
            {
                test: /\.(png|jpg|ico|gif|woff|woff2|eot|ttf|otf|svg)$/,
                use: [{
                    // 需要下载file-loader和url-loader
                    loader: "url-loader",
                    options: {
                        limit: 8 * 1024, //小于这个时将会已base64位图片打包处理
                        publicPath:"../image/",
                        outputPath: 'image/',
                        name:'[name].[ext]?[hash]'
                    }
                }]
            }
        ]
    },
    resolve: {
        alias: {
            util: __dirname + '/src/util',
            page: __dirname + '/src/page',
            service: __dirname + '/src/service',
            image: __dirname + '/src/image',
            node_modules: __dirname + '/node_modules',
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        // css 单独打包
        new miniCssExtractPlugin({
            filename: "css/[name].css",
            chunkFilename: "[id].css"
        }),
        new HtmlWebpackPlugin(getHtmlConfig('index',"首页")),
        new HtmlWebpackPlugin(getHtmlConfig('user-login',"用户登录")),
        new HtmlWebpackPlugin(getHtmlConfig('user-register',"用户注册")),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset',"找回密码")),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update',"修改密码")),
        new HtmlWebpackPlugin(getHtmlConfig('user-center',"用户中心")),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update',"修改个人信息")),
        new HtmlWebpackPlugin(getHtmlConfig('result',"操作结果"))
    ],
    optimization: {
        splitChunks: {}
    }
}

