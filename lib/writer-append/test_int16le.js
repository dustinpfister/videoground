const path = require('path');
const writer = require( path.join(__dirname, 'writer-append.js') );
//-------- ----------
// TEST
//-------- ----------
//const uri = path.join(__dirname, 'foo');

const uri = './foo';

const data = new Int16Array([ 512, 0 ]);
//const data = new Uint8Array([ 512 ]);
writer.append(uri, data, true );