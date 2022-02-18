const path = require('path');

const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';

module.exports = {
  // 개발모드, development or production
  mode,
  // entry를 기준으로 연관된 모든 파일들을 번들링
  entry: {
    app: path.join(__dirname, 'src', 'index.tsx'),
  },

  output: {
    filename: '[name].[chunkhash:8].js',
    path: path.resolve(__dirname, 'dist'),
  },

  // 번들링 될 파일 확장자 등록
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@hook': path.resolve(__dirname, 'src/hook'),
      '@style': path.resolve(__dirname, 'src/style'),
      '@api': path.resolve(__dirname, 'src/api/'),
      '@assets': path.resolve(__dirname, 'src/assets/'),
      '@icon': path.resolve(__dirname, 'src/assets/icon/'),
      '@image': path.resolve(__dirname, 'src/assets/image/'),
      '@components': path.resolve(__dirname, 'src/components/'),
      '@constant': path.resolve(__dirname, 'src/constant/'),
      '@store': path.resolve(__dirname, 'src/store/'),
      '@util': path.resolve(__dirname, 'src/util/'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
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
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
    ],
  },
  // webpack 서버 설정
  devServer: {
    static: {
      directory: '/',
    },
    port: 3000,
    hot: true,
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
