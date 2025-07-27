const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', // Entry point for React code
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js', // Output filename
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Target JavaScript files
        exclude: /node_modules/, // Exclude node_modules folder
        use: {
          loader: 'babel-loader', // Use Babel to transpile JS
        },
      },
      {
	test: /\.css$/,
	use: ['style-loader', 'css-loader','postcss-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/, // Handle image files
        type: 'asset/resource', // Use Webpack's asset/resource module to handle images
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Support .js and .jsx extensions
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 3000,
    open: true,
    hot: true,
    historyApiFallback: true,
    proxy: [
      {
        context: ['/api'],
        target: 'http://localhost:5001',
        changeOrigin: true,
      },
    ],
  },  
  plugins: [
    new HtmlWebpackPlugin({
      template: './dist/index.html', // HTML template for Webpack
    }),
  ],
};
