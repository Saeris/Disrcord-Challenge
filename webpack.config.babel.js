import path from 'path'
import webpack from 'webpack'
import { generateConfig, stripMetadata } from '@easy-webpack/core'
import envProd from '@easy-webpack/config-env-production'
import envDev from '@easy-webpack/config-env-development'
import babel from '@easy-webpack/config-babel'
import html from '@easy-webpack/config-html'
import css from '@easy-webpack/config-css'
import sass from '@easy-webpack/config-sass'
import fontAndImages from '@easy-webpack/config-fonts-and-images'
import generateIndexHtml from '@easy-webpack/config-generate-index-html'
import commonChunksOptimize from '@easy-webpack/config-common-chunks-simple'

const ENV = process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() || (process.env.NODE_ENV = `development`)
const port = process.env.PORT || 9000

const config = generateConfig({
  entry: {
    app: [
      `react-hot-loader/patch`,
      `webpack-dev-server/client?http://localhost:${port}/`,
      `webpack/hot/only-dev-server`,
      `./src/app.js`
    ],
    vendor: [
      `react`,
      `prop-types`,
      `react-apollo`,
      `react-dom`,
      `react-router`,
      `react-router-dom`,
      `react-router-redux`,
      `react-redux`,
      `redux`,
      `redux-logger`,
      `history`
    ]
  },
  output: {
    path: path.join(__dirname, `dist`),
    publicPath: `/`
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: false
  },
  resolve: {
    extensions: [`.js`, `.jsx`]
  },
  devServer: {
    historyApiFallback: true,
    hot: true
  },
  devtool: ENV === `production` ? `source-map` : `eval`,
  plugins: [
    new webpack.ProvidePlugin({
      React : `react`,
      Component: [`react`, `Component`],
      PropTypes: `prop-types`
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
},
ENV === `development` ? envDev({ devtool: `inline-source-map` }) : envProd(),
babel(),
html(),
css({ filename: `styles.css`, allChunks: true, sourceMap: false, additionalLoaders: [`postcss-loader`] }),
sass({ allChunks: true, sourceMap: false, additionalLoaders: [`postcss-loader`] }),
fontAndImages(),
generateIndexHtml({minify: ENV === `production`, overrideOptions: { template: `./public/index.ejs`, title: `Discord React Test`}}),
commonChunksOptimize({appChunkName: `app`, firstChunk: `vendor`})
)

export default stripMetadata(config)
