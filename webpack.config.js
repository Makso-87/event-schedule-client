const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const appDirectory = fs.realpathSync(process.cwd());

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';

module.exports = {
    entry: './src/index.tsx',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.scss$/i,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                namedExport: false,
                                exportLocalsConvention: 'as-is',
                                localIdentName: '[folder]_[local]__[hash:base64:5]',
                            },
                            importLoaders: 1,
                        },
                    },
                    {
                        loader: 'resolve-url-loader',
                        options: {
                            sourceMap: true,
                            root: path.resolve(appDirectory, 'src'),
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: path.resolve(__dirname, 'tsconfig.json'),
                        },
                    },
                ],
                exclude: /node_modules/,
            },
            // {
            //     test: /\.(png|svg|jpg|jpeg|webp)$/,
            //     use: [
            //         {
            //             loader: 'file-loader',
            //             options: {
            //                 name: 'static/media/[name].[hash].[ext]',
            //                 // outputPath: 'images',
            //                 // publicPath: 'images',
            //             },
            //         },
            //     ],
            // },
            {
                test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
                type: mode === 'production' ? 'asset' : 'asset/resource',
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.css', '.scss'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    devServer: {
        port: 108,
        hot: true,
    },
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
    ],
};
