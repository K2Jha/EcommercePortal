'use strict';

// Modules
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
//var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
var ENV = process.env.npm_lifecycle_event;
var isTest = ENV === 'test' || ENV === 'test-watch';
var isProd = ENV === 'build';

module.exports = function makeWebpackConfig() {

    var config = {};


    config.entry = {
        app: './src/app/app.js'
    };
    config.output = {
        // Absolute output directory
        path: __dirname + '/dist',

        // Output path from the view of the page
        // Uses webpack-dev-server in development
        publicPath: '/',

        // Filename for entry points
        // Only adds hash in build mode
        filename: '[name].bundle.js',

        // Filename for non-entry points
        // Only adds hash in build mode
        chunkFilename: '[name].bundle.js'
    };

    /**
     * Devtool
     * Reference: http://webpack.github.io/docs/configuration.html#devtool
     * Type of sourcemap to use per build type
     */

    config.devtool = 'eval-source-map';

    /**
     * Loaders
     * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
     * List: http://webpack.github.io/docs/list-of-loaders.html
     * This handles most of the magic responsible for converting modules
     */

    // Initialize module
    config.module = {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }, {

            test: /\.css$/,
            loader: ExtractTextPlugin.extract({
                fallbackLoader: 'style-loader',
                loader: [
                    { loader: 'css-loader', query: { sourceMap: true } },
                    { loader: 'postcss-loader' }
                ],
            })
        }, {

            test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
            loader: 'file-loader'
        }, {
            test: /\.html$/,
            loader: 'raw-loader'
        }]
    };

    /**
     * PostCSS
     * Reference: https://github.com/postcss/autoprefixer-core
     * Add vendor prefixes to your css
     */
    // NOTE: This is now handled in the `postcss.config.js`
    //       webpack2 has some issues, making the config file necessary

    /**
     * Plugins
     * Reference: http://webpack.github.io/docs/configuration.html#plugins
     * List: http://webpack.github.io/docs/list-of-plugins.html
     */
    config.plugins = [
        new CleanWebpackPlugin(),
        new webpack.LoaderOptionsPlugin({
            test: /\.scss$/i,
            options: {
                postcss: {
                    plugins: [autoprefixer]
                }
            }
        })
    ];

    config.plugins.push(
        new HtmlWebpackPlugin({
            template: './src/public/index.html',
            inject: 'body'
        }),
        new ExtractTextPlugin({ filename: 'css/[name].css', disable: !isProd, allChunks: true })
    )


    // Add build specific plugins
    // if (isProd) {
    //     config.plugins.push(
    //         // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
    //         // Only emit files when there are no errors
    //         new webpack.NoErrorsPlugin(),

    //         // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
    //         // Minify all javascript, switch loaders to minimizing mode
    //         new webpack.optimize.UglifyJsPlugin(),

    //         // Copy assets from the public folder
    //         // Reference: https://github.com/kevlened/copy-webpack-plugin
    //         new CopyWebpackPlugin([{
    //             from: __dirname + '/src/public'
    //         }])
    //     )
    // }

    /**
     * Dev server configuration
     * Reference: http://webpack.github.io/docs/configuration.html#devserver
     * Reference: http://webpack.github.io/docs/webpack-dev-server.html
     */
    config.devServer = {
        contentBase: './src/public',
        stats: 'minimal',
        host: '0.0.0.0'
    };

    return config;
}();