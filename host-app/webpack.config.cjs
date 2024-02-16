const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  mode:'development',
  entry: './src/main.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    port: 5174,
    liveReload: true,
    historyApiFallback: true,
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })],
    alias: {
      // Add aliases for your custom paths here
      components: path.resolve(__dirname, "./src/components"),
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        use: [ 'css-loader']
      }
    ]
  },
  name:"host",
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: "index.html",
    }),
    new ModuleFederationPlugin({
      name: 'host',
      filename: "remoteEntry.js",
      remotes: {
        remote: 'remote@http://localhost:5173/remoteEntry.js',
        inventory:'inventory@http://localhost:5175/remoteEntry.js',
      },
    }),
  ],
};
