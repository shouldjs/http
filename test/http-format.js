'use strict';

var should = require('should');
require('../');

const http = require('http');

const PAYLOAD = JSON.stringify({test: 'test'});

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(PAYLOAD);
});

const PORT = 8888;

server.listen(PORT);

http.get({
  hostname: 'localhost',
  port: PORT
}, (res) => {
  res.should.not.be.json();
});
