var should = require('should');
require('../');

var assert = require('assert');

function err(fn, msg) {
  var ok = true;
  try {
    fn();
    ok = false;
  } catch (err) {
    assert.equal(err.message, msg);
  }
  if(!ok) assert.fail('expected an error');
}

describe('http', function() {
  it('test .json', function(){
    var req = {
      headers: {
        'content-type': 'application/json'
      }
    };

    req.should.be.json();

    req = {
      headers: {
        'content-type': 'application/json; charset=utf-8'
      }
    };

    req.should.be.json();

    req = {
      headers: {
        'content-type': 'text/html'
      }
    };

    req.should.not.be.json();

    ({}).should.not.be.json();
  });

  it('test .xml', function(){
    var req = {
      headers: {
        'content-type': 'application/xml'
      }
    };

    req.should.be.xml();

    req = {
      headers: {
        'content-type': 'application/xml; charset=utf-8'
      }
    };

    req.should.be.xml();

    req = {
      headers: {
        'content-type': 'text/html'
      }
    };

    req.should.not.be.xml();

    ({}).should.not.be.xml();
  });

  it('test .status', function() {
    ({ statusCode: 300 }).should.have.not.status(200);

    ({ statusCode: 200 }).should.have.status(200);
  })

  it('test .header', function () {
    ({
      headers: {
        'content-type': 'image/x-icon',
        'content-length': '318',
        etag: '"4acba26164356285e6908e8bf0529fab"',
        'cache-control': 'public, max-age=86400',
        'x-response-time': '1ms',
        date: 'Wed, 19 Feb 2014 05:20:55 GMT',
        connection: 'close'
      }
    }).should.header('Content-Type', 'image/x-icon');

    ({
      headers: {
        'content-type': 'image/x-icon',
        'content-length': '318',
        etag: '"4acba26164356285e6908e8bf0529fab"',
        'cache-control': 'public, max-age=86400',
        'x-response-time': '1ms',
        date: 'Wed, 19 Feb 2014 05:20:55 GMT',
        connection: 'close'
      }
    }).should.header('Content-Type');

  })
});
