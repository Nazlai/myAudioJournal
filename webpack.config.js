const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv").config();

const webpackConfig = {
  entry: "/src/app/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "index.bundle.js",
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      app: path.resolve(__dirname, "src/app"),
      components: path.resolve(__dirname, "src/app/components"),
      firebaseUtils: path.resolve(__dirname, "src/app/firebase"),
      constants: path.resolve(__dirname, "src/app/constants"),
      screens: path.resolve(__dirname, "src/app/screens"),
      utils: path.resolve(__dirname, "src/app/utils"),
      session: path.resolve(__dirname, "src/app/session"),
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
    new CleanWebpackPlugin(),
  ],
};

module.exports = webpackConfig;
