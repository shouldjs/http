/*
 * should-http
 * Copyright(c) 2010-2013 TJ Holowaychuk <tj@vision-media.ca>
 * Copyright(c) 2013-2016 Denis Bardadym <bardadymchik@gmail.com>
 * MIT Licensed
 */

var contentType = require('content-type');

module.exports = function(should, Assertion) {
  var i = should.format;

  /**
   * Asserts given object has property headers which contain `field` and optional `val`. Will work well with node Request/Response etc.
   *
   * @name header
   * @memberOf Assertion
   * @category assertion http
   * @module should-http
   * @param {string} field Name of field
   * @param {string} [val] Optional value of field
   * @example
   *
   * res.should.have.header('content-type', 'application/json');
   */
  Assertion.add('header', function(field, val) {
    var obj = this.obj;

    var assert = should(obj).have.property('headers');

    this.params = { operator: 'to have header ' + i(field) + (val !== undefined ? (':' + i(val)) : '') };
    if (val != null) {
      assert.have.property(field.toLowerCase(), val);
    } else {
      assert.have.property(field.toLowerCase());
    }
  });

  /**
   * Asserts given object has property statusCode which equal to `code`. Works well with node's Response.
   *
   * @name status
   * @memberOf Assertion
   * @category assertion http
   * @module should-http
   * @param {number} code Status code value
   * @example
   *
   * res.should.have.status(200);
   */
  Assertion.add('status', function(code) {
    var obj = this.obj;

    obj.should.have.property('statusCode', code);
  });

  /**
   * Shortcut for .should.header('content-type', 'application/json')
   *
   * @name json
   * @memberOf Assertion
   * @category assertion http
   * @module should-http
   * @example
   *
   * res.should.be.json();
   */
  Assertion.add('json', function() {
    this.have.contentType('application/json');
  });

  /**
   * Shortcut for .should.header('content-type', 'text/html')
   *
   * @name html
   * @memberOf Assertion
   * @category assertion http
   * @module should-http
   * @example
   *
   * res.should.be.html();
   */
  Assertion.add('html', function() {
    this.have.contentType('text/html');
  });

  /**
   * Shortcut for .should.header('content-type', 'application/xml')
   *
   * @name xml
   * @memberOf Assertion
   * @category assertion http
   * @module should-http
   * @example
   *
   * res.should.be.xml();
   */
  Assertion.add('xml', function() {
    this.have.contentType('application/xml');
  });

  /**
   * Check if response have header content-type with given type and charset
   *
   * @name contentType
   * @memberOf Assertion
   * @category assertion http
   * @module should-http
   * @param {string} type
   * @param {string} [charset]
   */
  Assertion.add('contentType', function(type, charset) {
    this.have.header('content-type');

    var ct = contentType.parse(this.obj); //changed by previous assertion
    should(ct.type).match(type);
    if(charset != null) {
      should(ct.parameters).have.property('charset').which.match(charset);
    }
  });
};
