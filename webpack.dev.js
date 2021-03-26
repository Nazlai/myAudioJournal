const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const webpack = require("webpack");
const dotenv = require("dotenv").config();

module.exports = merge(common, {
  mode: "development",
  plugins: [
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(dotenv.parsed),
    }),
  ],
});
