const merge = require('webpack-merge')
const common = require('./webpack.common')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
module.exports = merge(common, {
    mode: "development",
    plugins: [
        new UglifyJSPlugin()
    ]
})

