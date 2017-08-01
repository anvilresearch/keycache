/**
 * Dependencies
 */
const JWKSet = require('./JWKSet')

/**
 * LRU cache for storing JWK Sets with imported webcrypto keys in memory
 */
class LRUCache {

  /**
   * constructor
   */
  constructor (iterable, max) {
    this.cache = new Map(iterable)
    this.max = options.max
  }

  /**
   * get
   *
   * @description
   * Retrieve from memory cache. If not found, fetch from JKU and add to cache.
   *
   * @param {string} jku – url of JWK Set
   * @returns {Promise}
   */
  get (jku) {
    let cache = this.cache
    let jwks = cache.get(jku)

    if (jwks) {
      cache.delete(jku)
      cache.set(jku, jwks)
      return Promise.resolve(jwks)
    }

    return JWKSet.fetch(jku).then(jwks => this.set(jku, jwks))
  }

  /**
   * set
   *
   * @description
   * Add a JWK Set to the cache, keyed by JKU. Remove least
   * recently used items greater than maximum for this cache.
   *
   * @param {string} jku
   * @param {Object} jwks
   * @returns {Promise}
   */
  set (jku, jwks) {
    let { cache, max } = this

    // TODO
    // verify we actually have a JWKSet?

    cache.delete(jku)
    cache.set(jku, jwks)

    if (cache.size > max) {
      let keys = cache.keys()
      while (cache.size > max) {
        let key = keys.next().value
        cache.delete(key)
      }
    }

    return Promise.resolve(jwks)
  }

}

/**
 * Export
 */
module.exports = LRUCache
