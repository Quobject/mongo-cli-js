import * as _ from 'lodash';
import * as Promise from 'bluebird';
import * as child_process from 'child_process';
import * as os from 'os';
import * as util from 'util';
const exec = child_process.exec;

const cleanJson = function (line) {
  let parts, re, str, m, value, value2, comma;

  if (line.indexOf('ISODate') > -1) {
    parts = line.split(':');

    re = /ISODate\("(.*)"/g;
    str = line;

    while ((m = re.exec(str)) !== null) {
      if (m.index === re.lastIndex) {
        re.lastIndex++;
      }
      // View your result using the m-constiable.
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
      // View your result using the m-constiable.
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
      // View your result using the m-constiable.
      // eg m[0] etc.
      //console.log('m', m);
      value = m && m[1] ? m[1] : 'error';
      comma = m && m[2] ? m[2] : '';
    }

    return util.format('%s : { "$numberLong" : "%s" }%s', parts[0], value, comma);

  } else if (line.indexOf('Timestamp') > -1) {
    parts = line.split(':');

    re = /Timestamp\((\d*),\s*(\d*)\)/g;
    str = line;

    while ((m = re.exec(str)) !== null) {
      if (m.index === re.lastIndex) {
        re.lastIndex++;
      }
      // View your result using the m-constiable.
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


const objectStartingRow = function (resultp) {
  const lines = resultp.raw.split(os.EOL);
  resultp.lines = _.clone(lines);

  let jsonStartIndex = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    //console.log('line', line);
    if (line === '{') {
      jsonStartIndex = i;
      break;
    }
  }

  //console.log('jsonStartIndex', jsonStartIndex);


  try {
    const tempArray = lines.splice(jsonStartIndex);
    //console.log('tempArray', tempArray);

    const jsonString = tempArray.reduce(function (previousValue, currentValue) {
      const cleaned = cleanJson(currentValue.trim());
      return previousValue + cleaned;
    }, '');
    //console.log('jsonString', jsonString);
    resultp.object = JSON.parse(jsonString);

  } catch (e) {
    resultp.error = e;
  }

  return resultp;

};


const extractResult = function (result) {
  const extracterArray = [
    {
      re: /"db.isMaster/,
      run: function (resultp) {
        return objectStartingRow(resultp);
      },
    },
    {
      re: /"rs.conf/,
      run: function (resultp) {
        return objectStartingRow(resultp);
      },
    },
    {
      re: /"rs.initiate/,
      run: function (resultp) {
        return objectStartingRow(resultp);
      },
    },
    {
      re: /"rs.add/,
      run: function (resultp) {
        return objectStartingRow(resultp);
      },
    },
    {
      re: /"rs.status/,
      run: function (resultp) {
        return objectStartingRow(resultp);
      },
    },
  ];


  extracterArray.forEach(function (extracter) {
    const re = extracter.re;
    const str = result.command;
    let m;

    if ((m = re.exec(str)) !== null) {
      if (m.index === re.lastIndex) {
        re.lastIndex++;
      }
      // View your result using the m-constiable.
      // eg m[0] etc.
      return extracter.run(result);
    }
  });

  return result;
};

export class Mongo {

  constructor(private options: IOptions = new Options()) { }

  public command(command: string, callback?: (err, data) => void) {
    let mongo = this;
    let execCommand = 'mongo ';

    return Promise.resolve().then(function () {
      //console.log('execCommand =', execCommand);

      let params = mongo.options.toParams();
      //console.log('params = ', params);

      execCommand += ` ${params} --eval "${command}" `;

      let execOptions = {
        cwd: mongo.options.currentWorkingDirectory,
        env: {
          DEBUG: '',
          EDITOR: process.env.EDITOR,
          HOME: process.env.HOME,
          HOMEDRIVE: process.env.HOMEDRIVE,
          HOMEPATH: process.env.HOMEPATH,
          PATH: process.env.PATH,
        },
        maxBuffer: 200 * 1024 * 1024,
      };

      //console.log('exec options =', execOptions);

      return new Promise(function (resolve, reject) {
        exec(execCommand, execOptions, (error, stdout, stderr) => {
          if (error) {
            const message = `error: '${error}' stdout = '${stdout}' stderr = '${stderr}'`;
            console.error(message);
            reject(message);
          }
          //console.log(`stdout: ${stdout}`);
          resolve({ stderr: stderr, stdout: stdout });
        });
      });
    }).then(function (data: { stderr: string, stdout: string }) {

      let result = {
        command: execCommand,
        error: data.stderr,
        raw: data.stdout,
      };
      return extractResult(result);

    }).nodeify(callback);
  }
}




export interface IOptions {
  currentWorkingDirectory?: string;
  host?: string;
  port?: string;
  toParams(): string;
}


export class Options implements IOptions {
  public constructor(
    public currentWorkingDirectory?: string,
    public host = 'localhost',
    public port = '27017'
  ) { }

  public toParams(): string {
    const params = Object.keys(this).reduce((previousValue, key) => {
      if (key === 'currentWorkingDirectory') {
        return previousValue;
      }
      const value = this[key];
      //const key2 = _.snakeCase(key).replace('_', '-');
      return `${previousValue} --${key} ${value}`;
    }, '');

    return params;
  }

}

