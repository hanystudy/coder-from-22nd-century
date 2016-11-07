module.exports = {
    entry: "./javascripts/renderer.js",
    output: {
        path: __dirname,
        filename: "./public/bundle.js"
    },
    target: 'electron-renderer',
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
