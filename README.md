# mongo-cli-js
A node.js wrapper for the mongo command line tool

[![NPM](https://nodei.co/npm/mongo-cli-js.png?downloads=true&downloadRank=true)](https://nodei.co/npm/mongo-cli-js/)
[![NPM](https://nodei.co/npm-dl/mongo-cli-js.png?months=6&height=3)](https://nodei.co/npm/mongo-cli-js/)

## Installation

### Step 1: Prerequisites

mongodb must be installed and accessible in the path

### Step 2: Installation
    
    npm install mongo-cli-js
    
Then:

```js
var Mongo = require('mongo-cli-js');
```

## Usage

With promise

```js
var mongo = new Mongo({
  host: 'localhost',
  port: 27017
});

mongo.command('db.isMaster()').then(function (data) {
  console.log('data = ', data); 
});

//data = {
//  command: 'mongo --host localhost --port 27017  --eval "db.isMaster()"',
//  raw: '["MongoDB shell version: 3.2.0\\nconnecting to: localhost:27017/test\\n{\\n\\t\\"ismaster\\" : false,\\n\\t\\"secondary\\" : false,\\n\\t\\"info\\" : \\"Does not have a valid replica set config\\",\\n\\t\\"isreplicaset\\" : true,\\n\\t\\"maxBsonObjectSize\\" : 16777216,\\n\\t\\"maxMessageSizeBytes\\" : 48000000,\\n\\t\\"maxWriteBatchSize\\" : 1000,\\n\\t\\"localTime\\" : ISODate(\\"2015-12-24T22:29:31.834Z\\"),\\n\\t\\"maxWireVersion\\" : 4,\\n\\t\\"minWireVersion\\" : 0,\\n\\t\\"ok\\" : 1\\n}\\n",""]',
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

