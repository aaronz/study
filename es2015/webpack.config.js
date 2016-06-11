var PROD = process.argv.indexOf('-p') >= 0;

module.exports = {
    entry: {
        'wisdomui': __dirname + '/index.js',
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loaders: ['babel?presets[]=es2015'],}
        ]
    },
    output: {
        library: 'wisdomui',
        path: __dirname + '/dist',
        filename: PROD ? '[name].min.js' : '[name].js'
    }
};