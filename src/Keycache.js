/**
 * Dependencies
 */
const LRUCache = require('./LRUCache')

/**
 * Keycache
 */
class Keycache {

  constructor (options = {}) {
    let lru = options.lru || { max: 20 }
    let max = lru.max

    this.cache = new LRUCache({}, max)
    this.store = options.store
  }

  verify (anything) {
    return Promise.resolve(wtf)

    // decode anything
    // find things to verify
    // for each, resolve keys
    // recurse
  }
}

/**
 * Export
 */
module.exports = Keycache
