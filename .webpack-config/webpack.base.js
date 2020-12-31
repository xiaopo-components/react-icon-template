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
        use:  {
          loader: require.resolve('babel-loader'),
          options: {
            presets: ['@babel/preset-env','@babel/preset-react'],
            plugins: [
              require.resolve('react-refresh/babel')
            ].filter(Boolean),
          },
        },
        exclude: /node_modules/
      },
      {
        test: /\.ts[x]?$/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              presets: ['@babel/preset-env','@babel/preset-react','@babel/preset-typescript'],
              plugins: [
                require.resolve('react-refresh/babel')
              ].filter(Boolean),
            },
          },
          {
            loader: require.resolve('ts-loader'),
            options: {
              transpileOnly: true,
            },
          },
        ],
        exclude: /node_modules/
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
            },
          },
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