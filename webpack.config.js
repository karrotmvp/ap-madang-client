const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const mode = process.env.NODE_ENV || 'development';
const Dotenv = require('dotenv-webpack');

module.exports = {
  // 개발모드, development or production
  mode,
  // entry를 기준으로 연관된 모든 파일들을 번들링
  entry: {
    app: path.join(__dirname, 'src', 'index.tsx'),
  },

  output: { filename: 'main.js', path: path.resolve(__dirname, 'dist') },

  // 번들링 될 파일 확장자 등록
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.svg'],
  },
  // 로더 등록
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  // webpack 서버 설정
  devServer: {
    static: {
      directory: '/',
    },
    port: 3000,
    hot: 'only',
    historyApiFallback: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      templateParameters: {
        env: process.env.NODE_ENV === 'production' ? '' : '[DEV]',
      },
      minify:
        process.env.NODE_ENV === 'production'
          ? {
              collapseWhitespace: true,
              removeComments: true,
            }
          : false,
    }),
    new Dotenv(),
  ],
};
