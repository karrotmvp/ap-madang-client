const path = require('path');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const mode = process.env.NODE_ENV || 'development';

module.exports = [
  {
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
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 240000,
                fallback: 'file-loader',
                name: 'fonts/[name].[ext]',
              },
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
      new BundleAnalyzerPlugin({
        analyzerMode: 'static', // 분석결과를 파일로 저장
        reportFilename: 'docs/size_dev.html', // 분설결과 파일을 저장할 경로와 파일명 지정
        defaultSizes: 'parsed',
        openAnalyzer: true, // 웹팩 빌드 후 보고서파일을 자동으로 열지 여부
        generateStatsFile: true, // 웹팩 stats.json 파일 자동생성
        statsFilename: 'docs/stats_dev.json', // stats.json 파일명 rename
      }),
    ],
  },
  {
    // 개발모드, development or production
    mode,
    // entry를 기준으로 연관된 모든 파일들을 번들링
    entry: {
      // 난독화할 파일에 대한 설정 추가 app.min이 파일의 이름이 되도록 설정
      'app.min': path.join(__dirname, 'src', 'index.tsx'),
    },

    output: { filename: 'main.min.js', path: path.resolve(__dirname, 'dist') },

    // 번들링 될 파일 확장자 등록
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.svg'],
    },
    optimization: {
      minimize: true,
      // ~.min.js 파일에 .min.js가 있는 경우에만 난독화를 하도록 설정
      minimizer: [
        new TerserJSPlugin({
          include: /\.min\.js$/,
        }),
        new OptimizeCSSAssetsPlugin({}),
      ],
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
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 240000,
                fallback: 'file-loader',
                name: 'fonts/[name].[ext]',
              },
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
      new BundleAnalyzerPlugin({
        analyzerMode: 'static', // 분석결과를 파일로 저장
        reportFilename: 'docs/size_dev.html', // 분설결과 파일을 저장할 경로와 파일명 지정
        defaultSizes: 'parsed',
        openAnalyzer: true, // 웹팩 빌드 후 보고서파일을 자동으로 열지 여부
        generateStatsFile: true, // 웹팩 stats.json 파일 자동생성
        statsFilename: 'docs/stats_dev.json', // stats.json 파일명 rename
      }),
    ],
  },
];
