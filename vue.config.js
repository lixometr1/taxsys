const path = require("path");
const fs = require("fs");
module.exports = {
  // publicPath: process.env.NODE_ENV === 'production' ? '/lk' : '/',
  publicPath: "/",
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.join(__dirname, "src/"),
      },
    },
  },
  devServer: {
    disableHostCheck: true,
    // https: true,
    // key: fs.readFileSync(path.join(__dirname, 'credentials_2', 'private.key')),
    // cert: fs.readFileSync(path.join(__dirname, 'credentials_2', 'private.crt')),
    // ca: fs.readFileSync(path.join(__dirname, 'credentials_2', 'private.pem'))
  },
  css: {
    loaderOptions: {
      sass: {
        sassOptions: {
          includePaths: ["./node_modules", "./src/assets"],
        },
      },
    },
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule("svg");

    svgRule.uses.clear();

    svgRule
      .use("babel-loader")
      .loader("babel-loader")
      .end()
      .use("vue-svg-loader")
      .loader("vue-svg-loader")
      .options({
        svgo: {
          plugins: [{ prefixIds: true }],
        },
      });

    const types = ["vue-modules", "vue", "normal-modules", "normal"];
    types.forEach((type) =>
      addStyleResource(config.module.rule("scss").oneOf(type))
    );
    function addStyleResource(rule) {
      rule
        .use("style-resource")
        .loader("style-resources-loader")
        .options({
          patterns: [
            path.resolve(__dirname, "./src/assets/scss/_imports.scss"),
          ],
        });
    }
  },
};
