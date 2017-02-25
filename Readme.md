# should.js http assertions

[![Build Status](https://travis-ci.org/shouldjs/http.svg?branch=master)](https://travis-ci.org/shouldjs/http)

This module can be usefull for asserting on node standard `http` modele request and response.

## Install

```
npm install should-http --save-dev
```

```
require('should-http');
```

That row patch your should instance adding assertions. With mocha you can use it via `-r` switch.

This module have built in formatting for node http IncommingMessage's.

## .status(code)

Asserts that `.statusCode` is `code`:
```javascript
res.should.have.status(200);
```

## .header(field[, value])

Asserts that a `.headers` object with `field` and optional `value` are present:
```javascript
res.should.have.header('content-length');
res.should.have.header('Content-Length', '123');
```

## .json

Assert that Content-Type is "application/json"

```javascript
res.should.be.json()
```

## .html

Assert that Content-Type is "text/html"
```javascript
res.should.be.html()
```

## .xml

Assert that Content-Type is "application/xml"

```js
res.should.be.xml()
```

## .contentType(type [, charset])

Assert that Content-Type is a given `type` with optional `charset`

```js
res.should.have.contentType('application/xml');
```
