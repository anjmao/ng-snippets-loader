const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const package = require('../package.json');

module.exports = (env) => {
    const ghPages = env === 'gh-pages';

    return {
        devtool: 'eval-source-map',
        entry: './example/main.ts',
        output: {
            path: path.resolve(__dirname, '../dist'),
            publicPath: ghPages ? '/' + package.name : 'http://localhost:8080/',
            filename: 'bundle.[hash].js'
        },
        resolveLoader: {
            alias: {
                'ng-snippets-loader': path.join(__dirname, '../')
            }
        },
        resolve: {
            extensions: ['.ts', '.js', '.html', '.scss', '.css']
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    loader: ['awesome-typescript-loader?configFileName=./example/tsconfig.json', 'angular2-template-loader', package.name],
                    exclude: [/node_modules\/(?!(ng2-.+))/],
                },
                {
                    test: /\.(html)$/,
                    loader: ['raw-loader', package.name],
                    exclude: /node_modules/,
                },
                {
                    test: /\.scss$/,
                    include: path.resolve(__dirname, './'),
                    exclude: /node_modules/,
                    use: ExtractTextPlugin.extract({
                        use: ['css-loader', 'sass-loader']
                    })
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(['dist'], { root: path.join(__dirname, '../') }),
            new ExtractTextPlugin({ filename: 'style.[hash].css'}),
            new HtmlWebpackPlugin({
                template: './example/index.ejs',
                chunksSortMode: 'dependency',
                basePath: ghPages ? '/' + package.name : '/'
            })
        ],
        devServer: {
            contentBase: './example',
            historyApiFallback: true,
            quiet: true,
            stats: 'normal'
        }
    }
}