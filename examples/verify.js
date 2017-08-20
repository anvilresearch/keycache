/**
 * Example dependencies
 */
const express = require('express')
const { JWKSet } = require('@trust/jwk')
const { JWD } = require('@trust/jose')
const { KeyCache } = require('../src')

/**
 * Create a server to publish signer's jwks
 */
let server = express()

/**
 * Initialize the verifier
 */
let verifier = new KeyCache()

/**
 * Generate keys
 */
JWKSet.generateKeys('ES256').then(signer => {

  // Publish JWK Set
  server.get('/jwks', (req, res) => {
    res.type('json')
    res.send(signer.publicJwks)
  })

  // Start the server
  server.listen(6969)

  // Find the intended keypair
  let prv = signer.find({ alg: 'ES256', key_ops: { $in: ['sign'] } })
  let pub = signer.find({ kid: prv.kid, key_ops: { $in: ['verify'] } })

  // Sign a JWD, including kid and jku in protected header
  return JWD.sign({
    payload: {
      foo: 'bar'
    },
    signatures: [
      {
        protected: {
          alg: 'ES256',
          kid: pub.kid,
          jku: 'http://localhost:6969/jwks'
        },
        cryptoKey: prv.cryptoKey
      }
    ],
    //result: 'instance'
    serialization: 'compact'
  })
})

// verify the signed document
.then(doc => {
  console.log(doc)

  //JWKSet.importKeys('http://localhost:6969/jwks')
    //.then(jwks => {
    //  return jwks.find({
    //    kid: JSON.parse(doc).signatures[0]['protected'].kid
    //  })
    //})
    //.then(console.log)

  return verifier.verify(doc)
})



.then(console.log)
.catch(console.log)

