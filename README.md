# Keycache _(@trust/keycache)_

[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

> Key caching and signature verification for JOSE

Amet elit placeat ducimus consectetur quasi cupiditate. Tempora vero ratione error quibusdam ad laudantium inventore, eos. Expedita repellendus explicabo eveniet rerum dolorem vel. Nam libero obcaecati fugit aliquid vel, sapiente.

[jwt]: https://tools.ietf.org/html/rfc7519
[jwd]: https://tools.ietf.org/html/draft-smith-oauth-json-web-document-00
[jws]: https://tools.ietf.org/html/rfc7515
[jwe]: https://tools.ietf.org/html/rfc7516
[jwa]: https://tools.ietf.org/html/rfc7518
[jwk]: https://tools.ietf.org/html/rfc7517
[jwkset]: https://tools.ietf.org/html/rfc7517#section-5
[w3c-webcrypto]: https://www.w3.org/TR/WebCryptoAPI/
[node-webcrypto]: https://www.npmjs.com/package/@trust/webcrypto
[json-schema]: http://json-schema.org/
[json-doc]: https://www.npmjs.com/package/@trust/json-document


## Table of Contents

* [Security](#security)
* [Install](#install)
* [Usage](#usage)
* [Develop](#develop)
* [API](#api)
* [Contribute](#contribute)
* [MIT License](#mit-license)

## Security

TBD

## Install

```bash
$ npm install @trust/keycache --save
```

## Usage

### Node.js

```
const Keycache = require('@trust/keycache')
```

### Browser

TBD

## Develop

### Install

```bash
$ git clone git@github.com:anvilresearch/keycache.git
$ cd keycache
$ npm install
```

### Test

```bash
$ npm test        // Node.js
$ npm run karma   // Karma (browser)
```

## API

TBD

## Contribute

### Issues

* please file [issues](https://github.com/anvilresearch/keycache/issues) :)
* for bug reports, include relevant details such as platform, version, relevant data, and stack traces
* be sure to check for existing issues before opening new ones
* read the documentation before asking questions
* it's strongly recommended to open an issue before hacking and submitting a PR
* we reserve the right to close an issue for excessive bikeshedding

### Pull requests

#### Policy

* we're not presently accepting *unsolicited* pull requests
* create an issue to discuss proposed features before submitting a pull request
* create an issue to propose changes of code style or introduce new tooling
* ensure your work is harmonious with the overall direction of the project
* ensure your work does not duplicate existing effort
* keep the scope compact; avoid PRs with more than one feature or fix
* code review with maintainers is required before any merging of pull requests
* new code must respect the style guide and overall architecture of the project
* be prepared to defend your work

#### Style guide

* ES6
* Standard JavaScript
* jsdocs

#### Code reviews

* required before merging PRs
* reviewers SHOULD run the code under review

### Collaborating

#### Weekly project meeting

* Thursdays from 1:00 PM to 2:00 Eastern US time at [TBD]
* Join remotely with Google Hangouts

#### Pair programming

* Required for new contributors
* Work directly with one or more members of the core development team

### Code of conduct

* @trust/keycache follows the [Contributor Covenant](http://contributor-covenant.org/version/1/3/0/) Code of Conduct.

### Contributors

* Christian Smith [@christiansmith](https://github.com/christiansmith)
* Greg Linklater [@EternalDeiwos](https://github.com/EternalDeiwos)
* Ioan Budea [@johnny90](https://github.com/johnny90)

## MIT License

Copyright (c) 2017 Anvil Research, Inc.
