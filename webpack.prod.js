const path = require("path");
const webpackMerge = require("webpack-merge");
const commonConfig = require("./webpack.common");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const OptimizeCssPlugin = require("optimize-css-assets-webpack-plugin");
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const outputFile = "[name]";
const assetFile = "[name]";
const assetPath = "/";

module.exports = (env) => {
  // package.jsonのscriptで --env.envFile=で指定されたパスのenvFileを使用する。
  // 指定されていない場合は.env.developmentを使用する
  const envFilePath = env ? `./env/.env.${env.file}` : "./env/.env.development";

  // webpack.common.jsのentryで追加したhtmlファイルを動的に生成する。
  const createHtmlPlugins = (entry) => {
    const htmpPlugins = [];
    Object.keys(entry).forEach((key) => {
      htmpPlugins.push(
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, `./src/pages/${key}.html`),
          // 出力されるファイル名
          filename: `${key}.html`,
          // headにjsファイルを入れたい場合はheadを指定
          inject: "body",
          // 読み込むjsファイルを指定
          chunks: [key],
        })
      );
    });
    return htmpPlugins;
  };
  return webpackMerge(
    commonConfig({ outputFile, assetFile, envFilePath, assetPath }),
    {
      mode: "production",
      plugins: createHtmlPlugins(
        commonConfig({ outputFile, assetFile, envFilePath, assetPath }).entry
      ),
      optimization: {
        minimizer: [
          // javascriptの最適化
          new TerserWebpackPlugin({
            terserOptions: {
              // consoleを削除する
              compress: { drop_console: true },
            },
          }),
          // cssの最適化
          new OptimizeCssPlugin(),
        ],
      },
    }
  );
};
