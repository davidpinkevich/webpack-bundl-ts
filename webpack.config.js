// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV == 'production';


const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const EslingPlugin = require('eslint-webpack-plugin');




const config = {
  entry: {
    index: './src/index.ts', // какие js файлы будут в итоговом бандле, можно перечислить нужное кол-во
    // second: './src/ts/second.ts',
  },
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        open: true,
        host: 'localhost',
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.html',
        chunks: ['index'], // какие скрипты подключать к странице
        inject: 'body', // вставить скрипт в конец тега body
        // minify: false,  отменить минификацию
      }),
      // new HtmlWebpackPlugin({
      //   filename: 'second.html',
      //   template: './src/html/second.html',
      //   chunks: ['second'], // какие скрипты подключать к странице
      //   inject: 'body', // вставить скрипт в конец тега body
      //   // minify: false,  отменить минификацию
      // }),
      // new CopyPlugin({
      //   patterns: [
      //     { from: "./src/assets", to: "assets" },
      //   ],
      // }),
      new CleanWebpackPlugin(),
      new EslingPlugin({ extensions: 'ts' }),
        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                loader: 'ts-loader',
                exclude: ['/node_modules/'],
            },
            {
                test: /\.css$/i,
                use: [stylesHandler,'css-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [stylesHandler, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset/resource',
                generator: {
                  filename: 'assets/[name][hash][ext]'
              }
            },
            {
              test: /\.(mp3|ogg)$/,
              type: "asset",
            }

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        
        config.plugins.push(new MiniCssExtractPlugin());
        
        
    } else {
        config.mode = 'development';
    }
    return config;
};
