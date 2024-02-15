const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
  mode:"development",
  entry: './src/main.jsx',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  devServer: {
    port: 5173,
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
  name:"remote",
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
        use: ['css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
    }),
    new ModuleFederationPlugin({
      name: 'remote',
      filename: 'remoteEntry.js',
      // Use the resolve option to specify modules to be shared
      // Adjust paths to match the actual directory structure of your project
      exposes: {
        './App': './src/App',
        './List': './src/components/List',
        './Input': './src/components/Input',

      },
      remotes: {},
      shared: {},
    }),
  ],
};
