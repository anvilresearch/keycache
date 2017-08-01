/**
 * Dependencies
 */
const { Keycache } = require('../src')

/**
 * Initialize cache
 */
let cache = new Keycache({
  lru: { max: 50 },
  store: new PouchDB('https://wtf.io:5984/database', {
    auth: {
      username: '',
      password: ''
    }
  })
})


// how to prevent cache poisoning?
// authenticate? but how?
// threshold scheme?
//repository.sync('...')


cache.verify(anything).then(...)
