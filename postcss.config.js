// const varsConfig = require('./stylesheets/variables')

// module.exports = {
//   parser: 'sugarss',
//   plugins: {
//     precss: {},
//     'postcss-simple-vars': {
//       variables() {
//         return varsConfig
//       }
//     },
//     'postcss-svg': {
//       paths: ['./images/svg', './images'],
//       ei: false,
//       svgo: true
//     },
//     'postcss-size': {},
//     autoprefixer: {
//       browsers: [
//         '> 1%',
//         'last 2 versions'
//       ]
//     },
//     'postcss-responsive-type': {},
//     'postcss-color-hex-alpha': {},
//     'postcss-triangle': {}
//   }
// }

module.exports = {
  parser: 'sugarss',
  plugins: {
    precss: {}
  }
}
