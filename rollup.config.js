import buble from '@rollup/plugin-buble';
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
    buble({
      namedFunctionExpressions: false,
    })
  ]
}
