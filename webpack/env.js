module.exports = require(
  `./${Object.is(process.env.NODE_ENV, 'production') ? 'prod' : 'dev'}.js`
)

