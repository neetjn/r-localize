import * as webpack from 'webpack'
import * as path from 'path'

const config: webpack.Configuration = {
  entry: path.resolve(__dirname, './src/main.ts'),
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'r-localize.js',
    library: 'someLibName',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.tag$/,
        exclude: /node_modules/,
        loader: 'riot-tag-loader',
        enforce: 'pre',
        query: {
          type: 'typescript'
        }
      },
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  }
}

export default config
