# mongo-cli-js
A node.js wrapper for the mongo command line tool

[![NPM](https://nodei.co/npm/mongo-cli-js.png?downloads=true&downloadRank=true)](https://nodei.co/npm/mongo-cli-js/)
[![NPM](https://nodei.co/npm-dl/mongo-cli-js.png?months=6&height=3)](https://nodei.co/npm/mongo-cli-js/)

## Installation

### Step 1: Prerequisites

The mongodb must be installed and accessible in the path

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


```

With callback:

```js

mongo.command('db.isMaster()', function (err, data) {
  console.log('data = ', data);
});

```

