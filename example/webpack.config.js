const path = require('path');

module.exports = {
    devtool: 'eval-source-map',
    entry: './example/main.ts',
    output: {
        path: path.resolve(__dirname, '../'),
        publicPath: 'http://localhost:8080/',
        filename: 'bundle.js'
    },
    resolveLoader: {
        alias: {
            'ng-snippets-loader': path.join(__dirname, '../')
        }
    },
    resolve: {
        extensions: ['.ts', '.js', '.html']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: ['awesome-typescript-loader?configFileName=./example/tsconfig.json', 'angular2-template-loader', 'ng-snippets-loader'],
                exclude: [/node_modules\/(?!(ng2-.+))/],
            },
            {
                test: /\.(html)$/,
                loader: ['raw-loader', 'ng-snippets-loader']
            }
        ]
    },
    devServer: {
        contentBase: './example',
        historyApiFallback: true,
        quiet: true,
        stats: 'normal'
    }
};