module.exports = {
    module: {
      rules: [
        {
          test: /\.html$/i,
          loader: "html-loader?attrs[]=video:src",
        },
        {
          test: /\.mp4$/,
          loader: "url-loader?limit=10000&mimetype=video/mp4"
        },
        {
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        }
      ],
    },
  };

