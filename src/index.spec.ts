/* tslint:disable:no-shadowed-variable */
/* tslint:disable:no-unused-variable */
import test = require('blue-tape');
import * as path from 'path';
import * as util from 'util';
import { Mongo, Options } from './index';

test('mongo-cli-js', t => {
  const options = new Options(
      /* currentWorkingDirectory */ null
  );

  const mongo = new Mongo(options);

  t.test('db.isMaster()', t => {
    return mongo.command('db.isMaster()').then(function (data) {
      //console.log('data = ', util.inspect(data, { depth: 10 }));
      t.ok(data);
      t.ok(data.object);
      t.ok(data.object.ismaster);
    });
  });

  //t.test('rs.conf()', t => {
  //  return mongo.command('rs.conf()').then(function (data) {
  //    console.log('data = ', util.inspect(data, { depth: 10 }));
  //    t.ok(data);
  //    t.ok(data.object);
  //    t.ok(data.object.ismaster);
  //  });
  //});

  //t.test('rs.status()', t => {
  //  return mongo.command('rs.status()').then(function (data) {
  //    console.log('data = ', util.inspect(data, { depth: 10 }));
  //    t.ok(data);
  //    t.ok(data.object);
  //    t.ok(data.object.ismaster);
  //  });
  //});


});
