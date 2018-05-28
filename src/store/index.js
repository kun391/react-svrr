if (process.env.NODE_ENV === 'development') {
  module.exports = require(`./store.development`)
} else {
  module.exports = require('./store.production')
}
