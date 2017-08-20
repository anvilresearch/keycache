/**
 * Dependencies
 */
const base64url = require('base64url')
const LRU = require('./LRUCache')
const { JWD } = require('@trust/jose')

/**
 * KeyCache
 */
class KeyCache {

  /**
   * constructor
   */
  constructor (options = {}) {
    this.cache = new LRU(options)
  }

  /**
   * verify
   */
  verify (data, options) {
    let { cache } = this

    return Promise.resolve()
      .then(() => JWD.from(data))
      .then(({ payload, signatures }) => {
        return Promise.all(

          // verify each signature, recursing as needed
          signatures.map(({ 'protected': protectedHeader, signature }) => {
            let { alg, kid, jku, jwc } = protectedHeader

            // validate presence of "alg"
            if (!alg) {
              return Promise.reject(
                new DataError('Missing "alg" in protected header')
              )
            }

            // Unsecured JWS
            if (alg === 'none') {
              return Promise.resolve(true)
            }

            // signing input
            let b64h = base64url(JSON.stringify(protectedHeader))
            let b64p = base64url(JSON.stringify(payload))
            let signingInput = `${b64h}.${b64p}`

            // certificate chain
            if (jwc && Array.isArray(jwc)) {}

            // certificate
            if (jwc) {
              return this.verify(jwc, { instance: true })
                .then(({ payload: publicKey }) => JWK.importKey(publicKey))
                .then(jwk => jwk.verify(signingInput, signature))
            }

            // trust anchor
            if (kid && jku) {
              return cache.getJwk(kid, jku).then(jwk => {
                return jwk.verify(signingInput, signature)
              })
            }

            return Promise.reject(new UnverifiableSignatureError())
          })
        )
        .then(result => {
          // optionally return instance/reject errors?
          return result.every(item => item === true)
        })
      })
  }
}

/**
 * Export
 */
module.exports = KeyCache
