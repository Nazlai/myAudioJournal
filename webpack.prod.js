const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const webpack = require("webpack");

module.exports = merge(common, {
  mode: "production",
  plugins: [
    new webpack.DefinePlugin({
      FIREBASE_API_KEY: JSON.stringify(process.env.FIREBASE_API_KEY),
      FIREBASE_AUTH_DOMAIN: JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
      FIREBASE_DATABASE_URL: JSON.stringify(process.env.FIREBASE_DATABASE_URL),
      FIREBASE_PROJECT_ID: JSON.stringify(process.env.FIREBASE_PROJECT_ID),
      FIREBASE_STORAGE_BUCKET: JSON.stringify(
        process.env.FIREBASE_STORAGE_BUCKET
      ),
      FIREBASE_MESSAGING_SENDER_ID: JSON.stringify(
        process.env.FIREBASE_MESSAGING_SENDER_ID
      ),
      FIREBASE_REDIRECT_URL: JSON.stringify(process.env.FIREBASE_REDIRECT_URL),
    }),
  ],
});
