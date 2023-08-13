const path = require('path');
const writer = require( path.join(__dirname, 'writer-append.js') );
//-------- ----------
// TEST
//-------- ----------
const uri = path.join(__dirname, 'foo');

const data_bytes = new Uint8Array([65, 65, 65, 65, 10]);
writer.append(uri, data_bytes, false );