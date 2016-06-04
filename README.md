# mongo-cli-js
A node.js wrapper for the mongo command line tool

[![NPM](https://nodei.co/npm/mongo-cli-js.png?downloads=true&downloadRank=true)](https://nodei.co/npm/mongo-cli-js/)
[![NPM](https://nodei.co/npm-dl/mongo-cli-js.png?months=6&height=3)](https://nodei.co/npm/mongo-cli-js/)

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]

## Installation

### Step 1: Prerequisites

mongodb must be installed and accessible in the path

### Step 2: Installation
    
    npm install mongo-cli-js
    
Then:

```js
var mongoCli = require('mongo-cli-js');
```

## Usage

With promise

```js
var Options = mongoCli.Options;
var Mongo = mongoCli.Mongo;
 
var options = new Options(
    /* currentWorkingDirectory */ null,
    /* host */ 'localhost', 
    /* port */ '27017', 
);

var mongo = new Mongo(options);

mongo.command('db.isMaster()').then(function (data) {
  console.log('data = ', data); 
});

//data = {
//  command: 'mongo --host localhost --port 27017  --eval "db.isMaster()"',
//  raw: 'MongoDB shell version: 3.2.0\\nconnecting to: localhost:27017/test\\n{\\n\\t\\"ismaster\\" : false,\\n\\t\\"secondary\\" : false,\\n\\t\\"info\\" : \\"Does not have a valid replica set config\\",\\n\\t\\"isreplicaset\\" : true,\\n\\t\\"maxBsonObjectSize\\" : 16777216,\\n\\t\\"maxMessageSizeBytes\\" : 48000000,\\n\\t\\"maxWriteBatchSize\\" : 1000,\\n\\t\\"localTime\\" : ISODate(\\"2015-12-24T22:29:31.834Z\\"),\\n\\t\\"maxWireVersion\\" : 4,\\n\\t\\"minWireVersion\\" : 0,\\n\\t\\"ok\\" : 1\\n}\\n',
//  lines:
//   ['MongoDB shell version: 3.2.0',
//     'connecting to: localhost:27017/test',
//     '{',
//     '\t"ismaster" : false,',
//     '\t"secondary" : false,',
//     '\t"info" : "Does not have a valid replica set config",',
//     '\t"isreplicaset" : true,',
//     '\t"maxBsonObjectSize" : 16777216,',
//     '\t"maxMessageSizeBytes" : 48000000,',
//     '\t"maxWriteBatchSize" : 1000,',
//     '\t"localTime" : ISODate("2015-12-24T22:29:31.834Z"),',
//     '\t"maxWireVersion" : 4,',
//     '\t"minWireVersion" : 0,',
//     '\t"ok" : 1',
//     '}',
//     ''],
//  object:
//   {
//     ismaster: false,
//     secondary: false,
//     info: 'Does not have a valid replica set config',
//     isreplicaset: true,
//     maxBsonObjectSize: 16777216,
//     maxMessageSizeBytes: 48000000,
//     maxWriteBatchSize: 1000,
//     localTime: { '$date': '2015-12-24T22:29:31.834Z' },
//     maxWireVersion: 4,
//     minWireVersion: 0,
//     ok: 1
//   }
//}

```

With callback:

```js

mongo.command('db.isMaster()', function (err, data) {
  console.log('data = ', data);
});

```

Typescript
```js
import { Mongo, Options } from 'mongo-cli-js';

const options = new Options(
    /* currentWorkingDirectory */ null,
    /* host */ 'localhost', 
    /* port */ '27017', 
);

const mongo = new Mongo(options);

mongo.command('db.isMaster()').then(function (data) {
  console.log('data = ', data);
});
```


* rs.conf()

```js

mongo.command('rs.conf()').then(function (data) {
  console.log('data = ', data); 
});


//data = {
//  command: 'mongo --host localhost --port 27017  --eval "rs.conf();"',
//  raw: 'MongoDB shell version: 3.2.0\\nconnecting to: localhost:27017/test\\n{\\n\\t\\"_id\\" : \\"mongodb\\",\\n\\t\\"version\\" : 1,\\n\\t\\"protocolVersion\\" : NumberLong(1),\\n\\t\\"members\\" : [\\n\\t\\t{\\n\\t\\t\\t\\"_id\\" : 0,\\n\\t\\t\\t\\"host\\" : \\"mongodb1:27017\\",\\n\\t\\t\\t\\"arbiterOnly\\" : false,\\n\\t\\t\\t\\"buildIndexes\\" : true,\\n\\t\\t\\t\\"hidden\\" : false,\\n\\t\\t\\t\\"priority\\" : 1,\\n\\t\\t\\t\\"tags\\" : {\\n\\t\\t\\t\\t\\n\\t\\t\\t},\\n\\t\\t\\t\\"slaveDelay\\" : NumberLong(0),\\n\\t\\t\\t\\"votes\\" : 1\\n\\t\\t}\\n\\t],\\n\\t\\"settings\\" : {\\n\\t\\t\\"chainingAllowed\\" : true,\\n\\t\\t\\"heartbeatIntervalMillis\\" : 2000,\\n\\t\\t\\"heartbeatTimeoutSecs\\" : 10,\\n\\t\\t\\"electionTimeoutMillis\\" : 10000,\\n\\t\\t\\"getLastErrorModes\\" : {\\n\\t\\t\\t\\n\\t\\t},\\n\\t\\t\\"getLastErrorDefaults\\" : {\\n\\t\\t\\t\\"w\\" : 1,\\n\\t\\t\\t\\"wtimeout\\" : 0\\n\\t\\t}\\n\\t}\\n}\\n',
//  lines:
//   ['MongoDB shell version: 3.2.0',
//     'connecting to: localhost:27017/test',
//     '{',
//     '\t"_id" : "mongodb",',
//     '\t"version" : 1,',
//     '\t"protocolVersion" : NumberLong(1),',
//     '\t"members" : [',
//     '\t\t{',
//     '\t\t\t"_id" : 0,',
//     '\t\t\t"host" : "mongodb1:27017",',
//     '\t\t\t"arbiterOnly" : false,',
//     '\t\t\t"buildIndexes" : true,',
//     '\t\t\t"hidden" : false,',
//     '\t\t\t"priority" : 1,',
//     '\t\t\t"tags" : {',
//     '\t\t\t\t',
//     '\t\t\t},',
//     '\t\t\t"slaveDelay" : NumberLong(0),',
//     '\t\t\t"votes" : 1',
//     '\t\t}',
//     '\t],',
//     '\t"settings" : {',
//     '\t\t"chainingAllowed" : true,',
//     '\t\t"heartbeatIntervalMillis" : 2000,',
//     '\t\t"heartbeatTimeoutSecs" : 10,',
//     '\t\t"electionTimeoutMillis" : 10000,',
//     '\t\t"getLastErrorModes" : {',
//     '\t\t\t',
//     '\t\t},',
//     '\t\t"getLastErrorDefaults" : {',
//     '\t\t\t"w" : 1,',
//     '\t\t\t"wtimeout" : 0',
//     '\t\t}',
//     '\t}',
//     '}',
//     ''],
//  object:
//   {
//     _id: 'mongodb',
//     version: 1,
//     protocolVersion: { '$numberLong': '1),' },
//     members:
//      [{
//        _id: 0,
//        host: 'mongodb1:27017',
//        arbiterOnly: false,
//        buildIndexes: true,
//        hidden: false,
//        priority: 1,
//        tags: {},
//        slaveDelay: { '$numberLong': '0),' },
//        votes: 1
//      }],
//     settings:
//      {
//        chainingAllowed: true,
//        heartbeatIntervalMillis: 2000,
//        heartbeatTimeoutSecs: 10,
//        electionTimeoutMillis: 10000,
//        getLastErrorModes: {},
//        getLastErrorDefaults: { w: 1, wtimeout: 0 }
//      }
//   }
//}
```

* rs.initiate()

```js

mongo.command('rs.initiate()').then(function (data) {
  console.log('data = ', data); 
});


//data = {
//  command: 'mongo --host localhost --port 27017  --eval "rs.initiate()"',
//  raw: 'MongoDB shell version: 3.2.0\\nconnecting to: localhost:27017/test\\n{\\n\\t\\"info2\\" : \\"no configuration specified. Using a default configuration for the set\\",\\n\\t\\"me\\" : \\"mongodb1:27017\\",\\n\\t\\"info\\" : \\"try querying local.system.replset to see current configuration\\",\\n\\t\\"ok\\" : 0,\\n\\t\\"errmsg\\" : \\"already initialized\\",\\n\\t\\"code\\" : 23\\n}\\n',
//  lines:
//   ['MongoDB shell version: 3.2.0',
//     'connecting to: localhost:27017/test',
//     '{',
//     '\t"info2" : "no configuration specified. Using a default configuration for the set",',
//     '\t"me" : "mongodb1:27017",',
//     '\t"info" : "try querying local.system.replset to see current configuration",',
//     '\t"ok" : 0,',
//     '\t"errmsg" : "already initialized",',
//     '\t"code" : 23',
//     '}',
//     ''],
//  object:
//   {
//     info2: 'no configuration specified. Using a default configuration for the set',
//     me: 'mongodb1:27017',
//     info: 'try querying local.system.replset to see current configuration',
//     ok: 0,
//     errmsg: 'already initialized',
//     code: 23
//   }
//}
```


* rs.conf()

```js

mongo.command('rs.conf()').then(function (data) {
  console.log('data = ', data); 
});


//data = {
//  command: 'mongo --host localhost --port 27017  --eval "rs.conf();"',
//  raw: 'MongoDB shell version: 3.2.0\\nconnecting to: localhost:27017/test\\n{\\n\\t\\"_id\\" : \\"mongodb\\",\\n\\t\\"version\\" : 1,\\n\\t\\"protocolVersion\\" : NumberLong(1),\\n\\t\\"members\\" : [\\n\\t\\t{\\n\\t\\t\\t\\"_id\\" : 0,\\n\\t\\t\\t\\"host\\" : \\"mongodb1:27017\\",\\n\\t\\t\\t\\"arbiterOnly\\" : false,\\n\\t\\t\\t\\"buildIndexes\\" : true,\\n\\t\\t\\t\\"hidden\\" : false,\\n\\t\\t\\t\\"priority\\" : 1,\\n\\t\\t\\t\\"tags\\" : {\\n\\t\\t\\t\\t\\n\\t\\t\\t},\\n\\t\\t\\t\\"slaveDelay\\" : NumberLong(0),\\n\\t\\t\\t\\"votes\\" : 1\\n\\t\\t}\\n\\t],\\n\\t\\"settings\\" : {\\n\\t\\t\\"chainingAllowed\\" : true,\\n\\t\\t\\"heartbeatIntervalMillis\\" : 2000,\\n\\t\\t\\"heartbeatTimeoutSecs\\" : 10,\\n\\t\\t\\"electionTimeoutMillis\\" : 10000,\\n\\t\\t\\"getLastErrorModes\\" : {\\n\\t\\t\\t\\n\\t\\t},\\n\\t\\t\\"getLastErrorDefaults\\" : {\\n\\t\\t\\t\\"w\\" : 1,\\n\\t\\t\\t\\"wtimeout\\" : 0\\n\\t\\t}\\n\\t}\\n}\\n',
//  lines:
//   ['MongoDB shell version: 3.2.0',
//     'connecting to: localhost:27017/test',
//     '{',
//     '\t"_id" : "mongodb",',
//     '\t"version" : 1,',
//     '\t"protocolVersion" : NumberLong(1),',
//     '\t"members" : [',
//     '\t\t{',
//     '\t\t\t"_id" : 0,',
//     '\t\t\t"host" : "mongodb1:27017",',
//     '\t\t\t"arbiterOnly" : false,',
//     '\t\t\t"buildIndexes" : true,',
//     '\t\t\t"hidden" : false,',
//     '\t\t\t"priority" : 1,',
//     '\t\t\t"tags" : {',
//     '\t\t\t\t',
//     '\t\t\t},',
//     '\t\t\t"slaveDelay" : NumberLong(0),',
//     '\t\t\t"votes" : 1',
//     '\t\t}',
//     '\t],',
//     '\t"settings" : {',
//     '\t\t"chainingAllowed" : true,',
//     '\t\t"heartbeatIntervalMillis" : 2000,',
//     '\t\t"heartbeatTimeoutSecs" : 10,',
//     '\t\t"electionTimeoutMillis" : 10000,',
//     '\t\t"getLastErrorModes" : {',
//     '\t\t\t',
//     '\t\t},',
//     '\t\t"getLastErrorDefaults" : {',
//     '\t\t\t"w" : 1,',
//     '\t\t\t"wtimeout" : 0',
//     '\t\t}',
//     '\t}',
//     '}',
//     ''],
//  object:
//   {
//     _id: 'mongodb',
//     version: 1,
//     protocolVersion: { '$numberLong': '1),' },
//     members:
//      [{
//        _id: 0,
//        host: 'mongodb1:27017',
//        arbiterOnly: false,
//        buildIndexes: true,
//        hidden: false,
//        priority: 1,
//        tags: {},
//        slaveDelay: { '$numberLong': '0),' },
//        votes: 1
//      }],
//     settings:
//      {
//        chainingAllowed: true,
//        heartbeatIntervalMillis: 2000,
//        heartbeatTimeoutSecs: 10,
//        electionTimeoutMillis: 10000,
//        getLastErrorModes: {},
//        getLastErrorDefaults: { w: 1, wtimeout: 0 }
//      }
//   }
//}
```

* rs.add()

```js

mongo.command('rs.add(\'mongodb2:27017\')').then(function (data) {
  console.log('data = ', data); 
});

//data = {
//  command: 'mongo --host localhost --port 27017  --eval "rs.add(\'mongodb2:27017\')"',
//  raw: 'MongoDB shell version: 3.2.0\\nconnecting to: localhost:27017/test\\n{ \\"ok\\" : 1 }\\n',
//  lines:
//   ['MongoDB shell version: 3.2.0',
//     'connecting to: localhost:27017/test',
//     '{ "ok" : 1 }',
//     ''],
//  object: { ok: 1 }
//}

```


* rs.status()

```js

mongo.command('rs.status()').then(function (data) {
  console.log('data = ', data); 
});


//data = {
//  command: 'mongo --host localhost --port 27017  --eval "rs.status()"',
//  raw: 'MongoDB shell version: 3.2.0\\nconnecting to: localhost:27017/test\\n{\\n\\t\\"set\\" : \\"mongodb\\",\\n\\t\\"date\\" : ISODate(\\"2015-12-25T07:03:18.365Z\\"),\\n\\t\\"myState\\" : 1,\\n\\t\\"term\\" : NumberLong(1),\\n\\t\\"heartbeatIntervalMillis\\" : NumberLong(2000),\\n\\t\\"members\\" : [\\n\\t\\t{\\n\\t\\t\\t\\"_id\\" : 0,\\n\\t\\t\\t\\"name\\" : \\"mongodb1:27017\\",\\n\\t\\t\\t\\"health\\" : 1,\\n\\t\\t\\t\\"state\\" : 1,\\n\\t\\t\\t\\"stateStr\\" : \\"PRIMARY\\",\\n\\t\\t\\t\\"uptime\\" : 4872,\\n\\t\\t\\t\\"optime\\" : {\\n\\t\\t\\t\\t\\"ts\\" : Timestamp(1451023102, 1),\\n\\t\\t\\t\\t\\"t\\" : NumberLong(1)\\n\\t\\t\\t},\\n\\t\\t\\t\\"optimeDate\\" : ISODate(\\"2015-12-25T05:58:22Z\\"),\\n\\t\\t\\t\\"electionTime\\" : Timestamp(1451022242, 2),\\n\\t\\t\\t\\"electionDate\\" : ISODate(\\"2015-12-25T05:44:02Z\\"),\\n\\t\\t\\t\\"configVersion\\" : 3,\\n\\t\\t\\t\\"self\\" : true\\n\\t\\t},\\n\\t\\t{\\n\\t\\t\\t\\"_id\\" : 1,\\n\\t\\t\\t\\"name\\" : \\"mongodb2:27017\\",\\n\\t\\t\\t\\"health\\" : 1,\\n\\t\\t\\t\\"state\\" : 2,\\n\\t\\t\\t\\"stateStr\\" : \\"SECONDARY\\",\\n\\t\\t\\t\\"uptime\\" : 4700,\\n\\t\\t\\t\\"optime\\" : {\\n\\t\\t\\t\\t\\"ts\\" : Timestamp(1451023102, 1),\\n\\t\\t\\t\\t\\"t\\" : NumberLong(1)\\n\\t\\t\\t},\\n\\t\\t\\t\\"optimeDate\\" : ISODate(\\"2015-12-25T05:58:22Z\\"),\\n\\t\\t\\t\\"lastHeartbeat\\" : ISODate(\\"2015-12-25T07:03:17.273Z\\"),\\n\\t\\t\\t\\"lastHeartbeatRecv\\" : ISODate(\\"2015-12-25T07:03:17.601Z\\"),\\n\\t\\t\\t\\"pingMs\\" : NumberLong(0),\\n\\t\\t\\t\\"syncingTo\\" : \\"mongodb1:27017\\",\\n\\t\\t\\t\\"configVersion\\" : 3\\n\\t\\t},\\n\\t\\t{\\n\\t\\t\\t\\"_id\\" : 2,\\n\\t\\t\\t\\"name\\" : \\"mongodb3:27017\\",\\n\\t\\t\\t\\"health\\" : 1,\\n\\t\\t\\t\\"state\\" : 2,\\n\\t\\t\\t\\"stateStr\\" : \\"SECONDARY\\",\\n\\t\\t\\t\\"uptime\\" : 3896,\\n\\t\\t\\t\\"optime\\" : {\\n\\t\\t\\t\\t\\"ts\\" : Timestamp(1451023102, 1),\\n\\t\\t\\t\\t\\"t\\" : NumberLong(1)\\n\\t\\t\\t},\\n\\t\\t\\t\\"optimeDate\\" : ISODate(\\"2015-12-25T05:58:22Z\\"),\\n\\t\\t\\t\\"lastHeartbeat\\" : ISODate(\\"2015-12-25T07:03:17.273Z\\"),\\n\\t\\t\\t\\"lastHeartbeatRecv\\" : ISODate(\\"2015-12-25T07:03:14.084Z\\"),\\n\\t\\t\\t\\"pingMs\\" : NumberLong(0),\\n\\t\\t\\t\\"configVersion\\" : 3\\n\\t\\t}\\n\\t],\\n\\t\\"ok\\" : 1\\n}\\n',
//  lines:
//   ['MongoDB shell version: 3.2.0',
//     'connecting to: localhost:27017/test',
//     '{',
//     '\t"set" : "mongodb",',
//     '\t"date" : ISODate("2015-12-25T07:03:18.365Z"),',
//     '\t"myState" : 1,',
//     '\t"term" : NumberLong(1),',
//     '\t"heartbeatIntervalMillis" : NumberLong(2000),',
//     '\t"members" : [',
//     '\t\t{',
//     '\t\t\t"_id" : 0,',
//     '\t\t\t"name" : "mongodb1:27017",',
//     '\t\t\t"health" : 1,',
//     '\t\t\t"state" : 1,',
//     '\t\t\t"stateStr" : "PRIMARY",',
//     '\t\t\t"uptime" : 4872,',
//     '\t\t\t"optime" : {',
//     '\t\t\t\t"ts" : Timestamp(1451023102, 1),',
//     '\t\t\t\t"t" : NumberLong(1)',
//     '\t\t\t},',
//     '\t\t\t"optimeDate" : ISODate("2015-12-25T05:58:22Z"),',
//     '\t\t\t"electionTime" : Timestamp(1451022242, 2),',
//     '\t\t\t"electionDate" : ISODate("2015-12-25T05:44:02Z"),',
//     '\t\t\t"configVersion" : 3,',
//     '\t\t\t"self" : true',
//     '\t\t},',
//     '\t\t{',
//     '\t\t\t"_id" : 1,',
//     '\t\t\t"name" : "mongodb2:27017",',
//     '\t\t\t"health" : 1,',
//     '\t\t\t"state" : 2,',
//     '\t\t\t"stateStr" : "SECONDARY",',
//     '\t\t\t"uptime" : 4700,',
//     '\t\t\t"optime" : {',
//     '\t\t\t\t"ts" : Timestamp(1451023102, 1),',
//     '\t\t\t\t"t" : NumberLong(1)',
//     '\t\t\t},',
//     '\t\t\t"optimeDate" : ISODate("2015-12-25T05:58:22Z"),',
//     '\t\t\t"lastHeartbeat" : ISODate("2015-12-25T07:03:17.273Z"),',
//     '\t\t\t"lastHeartbeatRecv" : ISODate("2015-12-25T07:03:17.601Z"),',
//     '\t\t\t"pingMs" : NumberLong(0),',
//     '\t\t\t"syncingTo" : "mongodb1:27017",',
//     '\t\t\t"configVersion" : 3',
//     '\t\t},',
//     '\t\t{',
//     '\t\t\t"_id" : 2,',
//     '\t\t\t"name" : "mongodb3:27017",',
//     '\t\t\t"health" : 1,',
//     '\t\t\t"state" : 2,',
//     '\t\t\t"stateStr" : "SECONDARY",',
//     '\t\t\t"uptime" : 3896,',
//     '\t\t\t"optime" : {',
//     '\t\t\t\t"ts" : Timestamp(1451023102, 1),',
//     '\t\t\t\t"t" : NumberLong(1)',
//     '\t\t\t},',
//     '\t\t\t"optimeDate" : ISODate("2015-12-25T05:58:22Z"),',
//     '\t\t\t"lastHeartbeat" : ISODate("2015-12-25T07:03:17.273Z"),',
//     '\t\t\t"lastHeartbeatRecv" : ISODate("2015-12-25T07:03:14.084Z"),',
//     '\t\t\t"pingMs" : NumberLong(0),',
//     '\t\t\t"configVersion" : 3',
//     '\t\t}',
//     '\t],',
//     '\t"ok" : 1',
//     '}',
//     ''],
//  object:
//   {
//     set: 'mongodb',
//     date: { '$date': '2015-12-25T07:03:18.365Z' },
//     myState: 1,
//     term: { '$numberLong': '1' },
//     heartbeatIntervalMillis: { '$numberLong': '2000' },
//     members:
//      [{
//        _id: 0,
//        name: 'mongodb1:27017',
//        health: 1,
//        state: 1,
//        stateStr: 'PRIMARY',
//        uptime: 4872,
//        optime:
//         {
//           ts: { '$timestamp': { t: 1451023102, i: 1 } },
//           t: { '$numberLong': '1' }
//         },
//        optimeDate: { '$date': '2015-12-25T05:58:22Z' },
//        electionTime: { '$timestamp': { t: 1451022242, i: 2 } },
//        electionDate: { '$date': '2015-12-25T05:44:02Z' },
//        configVersion: 3,
//        self: true
//      },
//        {
//          _id: 1,
//          name: 'mongodb2:27017',
//          health: 1,
//          state: 2,
//          stateStr: 'SECONDARY',
//          uptime: 4700,
//          optime:
//           {
//             ts: { '$timestamp': { t: 1451023102, i: 1 } },
//             t: { '$numberLong': '1' }
//           },
//          optimeDate: { '$date': '2015-12-25T05:58:22Z' },
//          lastHeartbeat: { '$date': '2015-12-25T07:03:17.273Z' },
//          lastHeartbeatRecv: { '$date': '2015-12-25T07:03:17.601Z' },
//          pingMs: { '$numberLong': '0' },
//          syncingTo: 'mongodb1:27017',
//          configVersion: 3
//        },
//        {
//          _id: 2,
//          name: 'mongodb3:27017',
//          health: 1,
//          state: 2,
//          stateStr: 'SECONDARY',
//          uptime: 3896,
//          optime:
//           {
//             ts: { '$timestamp': { t: 1451023102, i: 1 } },
//             t: { '$numberLong': '1' }
//           },
//          optimeDate: { '$date': '2015-12-25T05:58:22Z' },
//          lastHeartbeat: { '$date': '2015-12-25T07:03:17.273Z' },
//          lastHeartbeatRecv: { '$date': '2015-12-25T07:03:14.084Z' },
//          pingMs: { '$numberLong': '0' },
//          configVersion: 3
//        }],
//     ok: 1
//   }
//}
```

## License

MIT

[npm-image]: https://img.shields.io/npm/v/mongo-cli-js.svg?style=flat
[npm-url]: https://npmjs.org/package/mongo-cli-js
[downloads-image]: https://img.shields.io/npm/dm/mongo-cli-js.svg?style=flat
[downloads-url]: https://npmjs.org/package/mongo-cli-js