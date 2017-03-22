/*
 * should-http
 * Copyright(c) 2010-2013 TJ Holowaychuk <tj@vision-media.ca>
 * Copyright(c) 2013-2016 Denis Bardadym <bardadymchik@gmail.com>
 * MIT Licensed
 */

var http = require('http');

module.exports = function(should) {
  var t = should.modules.type;
  var format = should.modules.format;

  var NODE_HTTP_INCOMMING_MESSAGE = new t.Type(t.OBJECT, 'node-http-incomming-message');

  t.checker.addBeforeFirstMatch({}, function(obj) {
    if (obj instanceof http.IncomingMessage) {
      return NODE_HTTP_INCOMMING_MESSAGE;
    }
  });

  var FIELDS = {
    headers: true,
    httpVersion: true,
    method: true,
    statusCode: true,
    url: true,
    body: true
  };

  format.Formatter.addType(NODE_HTTP_INCOMMING_MESSAGE, function(value) {
    return format.formatPlainObject.call(this, value, {
      filterKey: function(key) {
        return key in FIELDS;
      }
    });
  });
};
