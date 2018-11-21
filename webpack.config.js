const path = require("path");
const webpack = require("webpack");

const config = {
  entry: path.join(__dirname, "./public/lib/poke_royale.js"),
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "./public")
  },
  plugins: [new webpack.ProgressPlugin()],
  devtool: "source-map"
};

module.exports = config;

// module.exports = {
//   entry: "./lib/poke_royale.js",
//   output: {
//   	filename: "./lib/bundle.js"
//   },
//   devtool: 'source-map',
// }; 