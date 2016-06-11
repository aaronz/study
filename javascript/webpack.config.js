var webpack = require('webpack');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

module.exports = {
    entry: './src/wisdomui.js',
    output: {
        library: 'FlexTab',
        filename: './dist/bundle.js'
    },
    plugins: [
        new uglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};