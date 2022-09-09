/* craco.config.js */
const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      "@modules": path.resolve(__dirname, "src/modules"),
      "@api": path.resolve(__dirname, "src/api"),
      "@context": path.resolve(__dirname, "src/context"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@utils": path.resolve(__dirname, "src/utils")
    },
  },
};