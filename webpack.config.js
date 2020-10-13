const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = () => {

    const mode = process.argv.includes('--mode=production') ? 'production' : 'development';

    return {
        mode: mode,
        entry: './src/js/main.js',
        output: {
            filename: 'main.js',
            path: path.resolve(__dirname, 'dist'),
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: './src/index.html'
            }),
            new MiniCssExtractPlugin({
                filename: '[name].css',
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        mode == 'production' ?
                            {
                                loader: MiniCssExtractPlugin.loader,
                                options: {
                                    publicPath: (resourcePath, context) => {
                                        return path.relative(path.dirname(resourcePath), context) + '/';
                                    },
                                },
                            } :
                            'style-loader',
                        'css-loader',
                        'sass-loader',
                    ],
                },
                {
                    test: /\.m?js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                }
            ],
        },
        devServer: {
            open: true,
            hot: true,
            port: 8000
        }
    }
};