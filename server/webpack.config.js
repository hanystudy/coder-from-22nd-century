module.exports = {
    entry: "./public/javascripts/client.js",
    output: {
        path: __dirname,
        filename: "./public/dist/bundle.js"
    },
    module: {
        loaders: [
          {
              test: /\.(js|jsx)$/,
              loader: 'babel-loader',
              exclude: /node_modules/,
              query: {
                  babelrc: false,
                  presets: ['es2015', 'stage-1', 'react']
              }
          },
        ]
    }
};
