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



describe('Mongo', function () {

  //it('should merge opts', function () {
  //  var mongo = new Mongo({ a: 'a' });
  //  assert.isNotNull(mongo);
  //  assert.equal(mongo.a, 'a');
  //  console.log('mongo', mongo);
  //});


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



});


