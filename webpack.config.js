module.exports = function (webpackEnv) {
  return {
    resolve: {
      fallback: {
        fs: require.resolve("fs"),
      },
    },
  };
};
