/*
 * @Author: web_XL
 * @Date: 2021-06-09 09:35:57
 * @LastEditors: web_XL
 * @LastEditTime: 2021-06-25 11:00:09
 * @Description:
 */
const path = require("path")

const resolve = dir => path.resolve(__dirname, dir)

module.exports = {
  webpack: {
    alias: {
      "@": resolve("src"),
      "components": resolve("src/components")
    },
    // output: {
    //   publicPath: "./"
    // }
  }
}
