const path = require('path');

module.exports = {
  entry: './lib/index.ts',
  target: 'web',
  output: {
    filename: 'bundle.[fullhash].js',
    path: path.join(__dirname, '/dist')
  },
  module: {
    // 配置相应的规则
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.js[x]?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.ts[x]?$/,
        use: [
          'babel-loader',
          'ts-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {loader: 'css-loader', options: {importLoaders: 1}},
          'less-loader'
        ],
      }
    ]
  },
  resolve: {
    extensions: [
      'web.mjs',
      'mjs',
      'web.js',
      'js',
      'web.ts',
      'ts',
      'web.tsx',
      'tsx',
      'json',
      'web.jsx',
      'jsx',
    ].map(e => `.${e}`)
  },
  plugins: [
  ]

}