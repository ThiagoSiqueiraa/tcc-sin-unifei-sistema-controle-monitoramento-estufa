import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import * as path from "path";
// this package handles all the external packages
import * as webpack from "webpack";
import webpackNodeExternals from "webpack-node-externals";
import WebpackShellPlugin from "webpack-shell-plugin-next";

// help running shell commands with webpack before and after the build process
// used to do the typechecking in a seperate process so the transpiling will be handled only by tsloader.
// speed up compilation of code

const { NODE_ENV = "production" } = process.env;

const mode: "production" | "development" =
  NODE_ENV === "production" ? "production" : "development";
const onBuildEnd: string[] =
  NODE_ENV === "development" ? ["yarn run:dev"] : ["yarn run:prod"];

const config: webpack.Configuration = {
  // our entry server file
  entry: "./src/server.ts",
  // should be here so webpack knows that it handles node packages
  target: "node",
  // mode can be production or development
  mode,
  // enable watching only if it is development mode
  watch: NODE_ENV === "development",
  externals: [webpackNodeExternals(), { typeorm: "commonjs typeorm" }],
  // output path, i chose build but feel free to change it to anything
  // output file name [name]. means that it will create multiple code chunks for the build
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].bundle.js",
  },
  // all file extensions to resolve, we might need to add file and images extensions if needed
  resolve: {
    extensions: [".ts", ".js", ".json"],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new WebpackShellPlugin({
      // when build ends run dev if the environment is development else run prod
      onBuildEnd: NODE_ENV === "development" ? "yarn run:dev" : "yarn run:prod",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              // use tsconfig.prod only in development mode
              configFile:
                NODE_ENV === "development"
                  ? "tsconfig.json"
                  : "tsconfig.prod.json",
              transpileOnly: true, // and we use ForkTsCheckerWebpackPlugin for type checking
            },
          },
        ],
      },
    ],
  },
};
export default config;
