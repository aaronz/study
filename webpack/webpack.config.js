var webpack = require("webpack");
module.exports = {
    entry: './app.js',
    output: {
        filename: 'bundle.js',
        path: './assets/js'
    },
    resolve: {
        root: [process.cwd() + '/js/components', process.cwd() + '/node_modules'],
        alias: {},
        extensions: ['', '.js', '.css', '.scss', '.ejs', '.png', '.jpg']
    }
};