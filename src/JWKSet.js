/**
 * Dependencies
 */
const { Model } = require('@trust/model')

/**
 * JWKSet
 *
 * Responsible for fetching/importing keys and resolving keys for a signature.
 */
class JWKSet extends Model {

  resolve (kid) {
    this.keys.filter(jwk => {
      if (jwk.kid === kid) {
        return true
      }
    })[0]
  }

  fetch (jku) {
    return Promise.resolve()
      .then(() => this.get(jku))
      .then(jwks => {
        // already exists in local store
        if (jwks) {
          return Promise.resolve(jwks)
        }

        // fetch and add to local store
        return fetch(jku)
          .then(errorStatusHandler)
          .then(response => response.json())
          .then(json => {
            let data = Object.assign({ _id: jku }, json)
            return this.put(data)
          })
      })
      .then(jwks => this.importKeys(jwks))
  }

  importKeys () {}

}

/**
 * Export
 */
module.exports = JWKSet
