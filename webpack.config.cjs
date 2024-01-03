const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js', // Punctul de intrare al aplicației dvs.
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'), // Directorul unde va fi creat pachetul
    filename: 'bundle.js', // Numele fișierului pachet
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Transformă fișierele .js
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Transpilează codul JS cu Babel
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/, // Transformă fișierele .css
        use: ['style-loader', 'css-loader'] // Adaugă CSS în DOM prin JS
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html' // Fișierul HTML de bază
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), // Actualizați această linie
    },
  }
};
