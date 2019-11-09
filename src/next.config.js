const withSize = require("next-size")
const withCss = require("@zeit/next-css")
const withPurgeCss = require("next-purgecss")
const withPlugins = require("next-compose-plugins")
module.exports = withPlugins([
  [withSize],
  [
    withCss(
      withPurgeCss({
        // purgeCss: {
        //   content: ["./pages/**/*.tsx", "./components/**/*.tsx"],
        //   defaultExtractor: (content) =>
        //     content.match(/[A-Za-z0-9-_:/]+/g) || []
        // }
      })
    )
  ]
])
