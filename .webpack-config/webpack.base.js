const path = require('path');

module.exports = {
  entry: path.join(__dirname, `../src/index.tsx`),
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
        use: ['style-loader', 'css-loader']
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
        test: /\.svg$/,
        include: path.resolve(__dirname, '../src/assets'),
        use: ['@svgr/webpack'],
      }
    ]
  },
  resolve: {
    extensions: [
      'js',
      'ts',
      'tsx',
      'json',
      'jsx',
    ].map(e => `.${e}`)
  },
  plugins: [
  ]

}