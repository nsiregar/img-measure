import buble from '@rollup/plugin-buble';
import commonjs from '@rollup/plugin-commonjs';
import resolve from "@rollup/plugin-node-resolve";
import packageJson from "./package.json";

export default {
  input: "src/main.js",
  output: [
    {
      format: "umd",
      file: packageJson.main,
      name: "ImgMeasure",
    }
  ],
  plugins: [
    commonjs(),
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    buble({
      namedFunctionExpressions: false,
    })
  ]
}
