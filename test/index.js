/**
* Copyright 2015 Matthias Ludwig
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
**/

/*global describe, it, before */
var Mongo = require('../lib/index.js');
var path = require('path');
var should = require('chai').should();
var assert = require('chai').assert;
var util = require('util');


describe('Mongo', function () {

  it('should merge opts', function () {
    var mongo = new Mongo({ a: 'a' });
    assert.isNotNull(mongo);
    assert.equal(mongo.a, 'a');
    console.log('mongo', mongo);
  });


  it('command db.isMaster() should pass', function (done) {
    var mongo = new Mongo({
      host: 'localhost',
      port: 27017
    });


    assert.isNotNull(mongo);
    var failed = false;
    var err = null;
    mongo.command('db.isMaster()').then(function (data) {
      console.log('data = ', data);
      assert.isNotNull(data);
    }).finally(function () {
      //console.log('finally ');
      assert.isFalse(failed);
      assert.isNull(err);
      done();
    });
  });


  it('command rs.conf(); should pass', function (done) {
    var mongo = new Mongo({
      host: 'localhost',
      port: 27017
    });

    assert.isNotNull(mongo);
    var failed = false;
    var err = null;
    mongo.command('rs.conf()').then(function (data) {
      console.log('data = ', util.inspect(data, {depth:10}));
      assert.isNotNull(data);
    }).finally(function () {
      //console.log('finally ');
      assert.isFalse(failed);
      assert.isNull(err);
      done();
    });
  });

  it('command rs.initiate(); should pass', function (done) {
    var mongo = new Mongo({
      host: 'localhost',
      port: 27017
    });


    assert.isNotNull(mongo);
    var failed = false;
    var err = null;
    mongo.command('rs.initiate()').then(function (data) {
      console.log('data = ', util.inspect(data, { depth: 10 }));
      assert.isNotNull(data);
    }).finally(function () {
      //console.log('finally ');
      assert.isFalse(failed);
      assert.isNull(err);
      done();
    });
  });


  it('command rs.add(); should pass', function (done) {
    var mongo = new Mongo({
      host: 'localhost',
      port: 27017
    });


    assert.isNotNull(mongo);
    var failed = false;
    var err = null;
    mongo.command('rs.add(\'mongodb2:27017\')').then(function (data) {
      console.log('data = ', util.inspect(data, { depth: 10 }));
      assert.isNotNull(data);
    }).finally(function () {
      //console.log('finally ');
      assert.isFalse(failed);
      assert.isNull(err);
      done();
    });
  });

  it('command rs.status() should pass', function (done) {
    var mongo = new Mongo({
      host: 'localhost',
      port: 27017
    });


    assert.isNotNull(mongo);
    var failed = false;
    var err = null;
    mongo.command('rs.status()').then(function (data) {
      console.log('data = ', util.inspect(data, {depth:10}));
      assert.isNotNull(data);
    }).finally(function () {
      //console.log('finally ');
      assert.isFalse(failed);
      assert.isNull(err);
      done();
    });
  });

  it('command rs.status() with replica set should pass', function (done) {
    var mongo = new Mongo({
      host: 'mongodb/mongodb1:27017,mongodb2:27018,mongodb3:27019'
    });


    assert.isNotNull(mongo);
    var failed = false;
    var err = null;
    mongo.command('rs.status()').then(function (data) {
      console.log('data = ', util.inspect(data, {depth:10}));
      assert.isNotNull(data);
    }).finally(function () {
      //console.log('finally ');
      assert.isFalse(failed);
      assert.isNull(err);
      done();
    });
  });


});

