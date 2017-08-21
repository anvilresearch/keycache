'use strict'

/**
 * Dependencies
 */
const PouchDB = require('pouchdb')
const { JWK, JWKSet } = require('@trust/jwk')

/**
 * LRU
 */
class LRU {

  /**
   * constructor
   */
  constructor (options) {
    this.cache = new Map()
    this.store = options.store || new PouchDB('data/jwks')
    this.max = options.max
  }

  /**
   * getJwk
   */
  getJwk (kid, jku) {
    return Promise.resolve()
      .then(() => this.getJwks(jku))
      .then(jwks => this.getJwkFromJwks(jwks, jku, kid))
  }

  /**
   * getJwks
   */
  getJwks (jku) {
    return Promise.resolve()
      .then(() => this.getJwksFromCache(jku))
      .then(jwks => this.getJwksFromStore(jwks, jku))
      .then(jwks => this.getJwksFromNetwork(jwks, jku))
      .then(jwks => this.cacheJwks(jwks))
  }

  /**
   * getJwksFromCache
   */
  getJwksFromCache (jku) {
    let cache = this.cache
    let jwks = cache.get(jku)

    return Promise.resolve(jwks)
  }

  /**
   * getJwksFromStore
   */
  getJwksFromStore (jwks, jku) {
    let { store } = this

    if (jwks) {
      return Promise.resolve(jwks)
    }

    return store.get(jku).then(data => {
      if (!data) { return null }
      return JWKSet.importKeys(data)
    })
    .catch(err => {
      if (err.status === 404) { return null }
      throw err
    })
  }

  /**
   * getJwksFromNetwork
   */
  getJwksFromNetwork (jwks, jku) {
    let { store } = this

    if (jwks) {
      return Promise.resolve(jwks)
    }

    return JWKSet.importKeys(jku)
      .then(jwks => {
        let data = Object.assign({ _id: jku }, jwks)
        return store.put(data)
          .then(() => jwks)
          .catch(err => {
            if (err.status === 404) {
              return null
            }

            if (err.status === 409) {
              return store.get(jku).then(({_rev}) => {
                data._rev = _rev
                return store.put(data).then(() => jwks)
              })
            }

            throw err
          })
      })
  }

  /**
   * cacheJwks
   */
  cacheJwks (jwks, jku) {
    let { cache, max } = this

    if (!jwks) {
      return Promise.reject(new Error('JWK Set not found'))
    }

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

  /**
   * getJwkFromJwks
   */
  getJwkFromJwks (jwks, jku, kid) {
    let jwk = jwks.find({ kid, key_ops: { $in: ['verify'] } })

    // success
    if (jwk) {
      return Promise.resolve(jwk)
    }

    // try again
    return Promise.resolve()
      .then(() => this.getJwksFromNetwork(null, jku))
      .then(jwks => this.cacheJwks(jwks, jku))
      .then(jwks => {
        let jwk = jwks.find({ kid, key_ops: { $in: ['verify'] } })

        if (!jwk) {
          return Promise.reject(new Error('JWK not found in JWK Set'))
        }

        return jwk
      })
  }

}

/**
 * Export
 */
module.exports = LRU
