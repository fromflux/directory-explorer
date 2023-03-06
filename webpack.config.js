const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/main.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', {
              targets: {
                node: 16,
              },
            }],
            '@babel/preset-react',
            '@babel/preset-typescript',
          ],
        },
      },
      {
        test: /\.css$/i,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', ',json'],
  },
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    static: path.resolve(__dirname, 'public'),
  },
};
