"use strict";

var path = require("path");

var MiniCssExtractPlugin = require("mini-css-extract-plugin");

var Dotenv = require("dotenv-webpack");

module.exports = function (_ref) {
  var outputFile = _ref.outputFile,
      assetFile = _ref.assetFile,
      envFilePath = _ref.envFilePath,
      assetPath = _ref.assetPath;
  return {
    entry: {
      // htmlが増える毎にここに追記
      // htmlページ名:そのhtmlの親となるjsファイル
      index: "./src/pages/index.js",
      "sample/index": "./src/pages/sample/index.js"
    },
    output: {
      filename: "./js/".concat(outputFile, ".js"),
      path: path.resolve(__dirname, "dist")
    },
    plugins: [// cssをcssファイルとして抽出する
    new MiniCssExtractPlugin({
      filename: "./css/".concat(outputFile, ".css")
    }), // .envファイルを使えるようにする
    new Dotenv({
      path: envFilePath
    })],
    module: {
      rules: [{
        enforce: "pre",
        test: /\.js$/,
        use: "eslint-loader",
        exclude: /node_modules/
      }, {
        test: /\.js$/,
        // transpile
        use: "babel-loader",
        exclude: /node_modules/
      }, {
        test: /\.s[ac]ss$/i,
        use: [// ここの順番は重要。下から順番に実行される
        // jsにバンドルせずcssファイルとして出力する
        MiniCssExtractPlugin.loader, // Translates CSS into CommonJS
        "css-loader", // プレフィックスを自動で付与する
        "postcss-loader", // Compiles Sass to CSS
        "sass-loader"]
      }, {
        test: /\.css$/i,
        use: [// ここの順番は重要。下から順番に実行される
        // jsにバンドルせずcssファイルとして出力する
        MiniCssExtractPlugin.loader, // cssをcommonJSに変換する
        "css-loader", // プレフィックスを自動で付与する
        "postcss-loader"]
      }, {
        test: /\.(glsl|frag|vert)$/,
        use: ["raw-loader", "glslify-loader"]
      }, {
        // 他の種類の静的ファイルを使用する場合は同様の記述で追加する。 ここの記述で(test)でobj読み込めるようになる
        test: /\.(png|svg|jpe?g|gif|obj|mp3|wav|bin|gltf|glb|mtl|jpg|drc)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [{
          loader: "file-loader",
          options: {
            name: "".concat(assetFile, ".[ext]"),
            outputPath: "assets/images/",
            // 画像の保存先によってパスを変更する。
            publicPath: "".concat(assetPath, "assets/images/"),
            //下記を記載することにより、画像読み込める
            esModule: false
          }
        }]
      }, {
        test: /\.(ttf|woff2?)$/,
        use: [{
          loader: "file-loader",
          options: {
            name: "".concat(assetFile, ".[ext]"),
            outputPath: "assets/fonts/",
            // 画像の保存先によってパスを変更する。
            publicPath: "".concat(assetPath, "assets/fonts/")
          }
        }]
      }, {
        test: /\.html$/,
        use: ["html-loader"]
      }, // 追記
      // 画像を相対パスで使えるようにする
      // {
      //   test: /\.(jpg|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
      //   exclude: /gltf/,
      //   loader: "url-loader?limit=100000",
      // },
      {
        // json読みこむ為の記述
        test: /\.json$/,
        loader: "json-loader",
        type: "javascript/auto"
      }]
    },
    resolve: {
      // 絶対パスでインポートできるようにする。
      alias: {
        "@js": path.resolve(__dirname, "src/js"),
        "@scss": path.resolve(__dirname, "src/scss"),
        "@assets": path.resolve(__dirname, "src/assets"),
        "~assets": path.resolve(__dirname, "./dist/assets"),
        "three/Water": path.join(__dirname, "node_modules/three/examples/js/objects/Water.js")
      },
      extensions: [".js"]
    }
  };
};