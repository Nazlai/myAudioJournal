const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv").config();
const isDevelopment = process.env.NODE_ENV === "development";

const webpackConfig = {
  entry: "/src/app/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "index.bundle.js",
  },
  resolve: {
    extensions: [".js", ".jsx", ".scss"],
    alias: {
      app: path.resolve(__dirname, "src/app"),
      components: path.resolve(__dirname, "src/app/components"),
      firebaseUtils: path.resolve(__dirname, "src/app/firebase"),
      constants: path.resolve(__dirname, "src/app/constants"),
      screens: path.resolve(__dirname, "src/app/screens"),
      utils: path.resolve(__dirname, "src/app/utils"),
      session: path.resolve(__dirname, "src/app/session"),
      styles: path.resolve(__dirname, "src/assets/stylesheets"),
    },
  },
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.module\.scss$/i,
        use: [
          isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
              sourceMap: isDevelopment,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: isDevelopment,
            },
          },
        ],
      },
      {
        test: /\.scss|css$/i,
        exclude: /\.module\.scss$/i,
        use: [
          isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: isDevelopment,
            },
          },
        ],
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: "url-loader",
      },
      {
        test: /\.(ttf|eot|svg)$/i,
        use: "file-loader",
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(dotenv.parsed),
    }),
    new HtmlWebpackPlugin({ template: "/src/app/index.html" }),
    new MiniCssExtractPlugin({
      filename: isDevelopment ? "[name].css" : "[name].[hash].css",
      chunkFilename: isDevelopment ? "[id].css" : "[id].[hash].css",
    }),
    new CleanWebpackPlugin(),
  ],
};

module.exports = webpackConfig;
