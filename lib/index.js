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
'use strict';

var Promise = require("bluebird");
var exec = Promise.promisify(require('child_process').exec);
var os = require('os');
var util = require('util');
var _ = require('lodash');

var Mongo = function (opts) {
  if (!(this instanceof Mongo)) {
    return new Mongo(opts);
  }

  _.merge(this, opts); 
};

Mongo.prototype.command = function (command, callback) {
  var self = this;
  var exec_command = 'mongo';

  return Promise.resolve().then(function () {
    var params = _.reduce(self, function (result, value, key) {
      result += util.format('--%s %s ', key, value);
      return result;
    }, '');

    exec_command += util.format(' %s --eval "%s"', params, command);
    //console.log('exec_command =', exec_command);

    var exec_options = {
      env: {
        HOME: process.env.HOME,
        PATH: process.env.PATH,
        EDITOR: process.env.EDITOR,
        HOMEDRIVE: process.env.HOMEDRIVE,
        HOMEPATH: process.env.HOMEPATH,
        DEBUG: ''
      }
    };
    if (self.cwd) {
      exec_options.cwd = self.cwd;
    }
    //console.log('exec options =', exec_options);

    return exec(exec_command, exec_options);

  }).then(function (data) {

    var result = {
      command: exec_command,
      raw: JSON.stringify(data)
    };
    return extractResult(result);

  }).nodeify(callback);
};

module.exports = Mongo;

var extractResult = function (result) {

  var extracterArray = [
    {
      re: /db.isMaster/,
      run: function (resultp) {
        return objectStartingRow3(resultp);
      }
    },
    {
      re: /rs.conf/,
      run: function (resultp) {
        return objectStartingRow3(resultp);
      }
    },
    {
      re: /rs.initiate/,
      run: function (resultp) {
        return objectStartingRow3(resultp);
      }
    },
    {
      re: /rs.add/,
      run: function (resultp) {
        return objectStartingRow3(resultp);
      }
    },
    {
      re: /rs.status/,
      run: function (resultp) {
        return objectStartingRow3(resultp);
      }
    }
  ];


  extracterArray.forEach(function (extracter) {
    var re = extracter.re;
    var str = result.command;
    var m;

    if ((m = re.exec(str)) !== null) {
      if (m.index === re.lastIndex) {
        re.lastIndex++;
      }
      // View your result using the m-variable.
      // eg m[0] etc.
      return extracter.run(result);
    }
  });

  return result;
};


var objectStartingRow3 = function (resultp) {
  var obj = JSON.parse(resultp.raw);
  var lines = obj[0].split(os.EOL);
  resultp.lines = _.clone(lines);

  try {
    var tempArray = lines.splice(2);
    //console.log('tempArray', tempArray);

    var jsonString = tempArray.reduce(function (previousValue, currentValue) {
      var cleaned = cleanJson(currentValue.trim());
      return previousValue + cleaned;
    }, '');
    console.log('jsonString', jsonString);
    resultp.object = JSON.parse(jsonString);

  } catch (e) {
    resultp.error = e;
  }

  return resultp;

};


var cleanJson = function (line) {
  var parts, re, str, m, value, value2, comma;

  if (line.indexOf('ISODate') > -1) {
    parts = line.split(':');

    re = /ISODate\("(.*)"/g;
    str = line;

    while ((m = re.exec(str)) !== null) {
      if (m.index === re.lastIndex) {
        re.lastIndex++;
      }
      // View your result using the m-variable.
      // eg m[0] etc.
      //console.log('m', m);
      value = m && m[1] ? m[1] : 'error';
    }

    return util.format('%s : { "$date" : "%s" },', parts[0], value);
  } else if (line.indexOf('ObjectId') > -1) {
    parts = line.split(':');

    re = /ObjectId\("(.*)"/g;
    str = line;

    while ((m = re.exec(str)) !== null) {
      if (m.index === re.lastIndex) {
        re.lastIndex++;
      }
      // View your result using the m-variable.
      // eg m[0] etc.
      //console.log('m', m);
      value = m && m[1] ? m[1] : 'error';
    }

    return util.format('%s : { "$oid" : "%s" },', parts[0], value);
  } else if (line.indexOf('NumberLong') > -1) {
    parts = line.split(':');

    re = /NumberLong\((.*)\)(,*)/g;
    str = line;

    while ((m = re.exec(str)) !== null) {
      if (m.index === re.lastIndex) {
        re.lastIndex++;
      }
      // View your result using the m-variable.
      // eg m[0] etc.
      //console.log('m', m);
      value = m && m[1] ? m[1] : 'error';
      comma = m && m[2] ? m[2] : '';
    }

    return util.format('%s : { "$numberLong" : "%s" }%s', parts[0], value,comma);

  } else if (line.indexOf('Timestamp') > -1) {
    parts = line.split(':');

    re = /Timestamp\((\d*),\s*(\d*)\)/g;
    str = line;

    while ((m = re.exec(str)) !== null) {
      if (m.index === re.lastIndex) {
        re.lastIndex++;
      }
      // View your result using the m-variable.
      // eg m[0] etc.
      //console.log('m', m);
      value = m && m[1] ? m[1] : 'error';
      value2 = m && m[2] ? m[2] : 'error';
    }
    //return '';
    return util.format('%s : { "$timestamp" : { "t" : %s, "i" : %s } },', parts[0], value, value2);


  } else {

    return line;
  }


};
