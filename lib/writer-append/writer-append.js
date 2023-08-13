const path = require('path');
const fs = require('fs');
const promisify = require('util').promisify;
const write = promisify(fs.writeFile);
//-------- ----------
// PUPLIC API 
//-------- ----------
const writer = {};
// use fs.writeFile in append mode to write the given Uint8Array
// however allow for a clear method that will write over with a new file if it is there
writer.append = (uri, data_bytes = new Uint8Array(), clear = true ) => {
    // resolve '~' to home folder location
    if (uri[0] === '~') {
        uri = path.join( process.env.HOME, uri.slice( 1 ) );
    }
    const buff = Buffer.from( data_bytes );
    if(clear){
        return write(uri, buff);
    }
    return write(uri, buff, { flag: 'a+' });
};

// exporting API
module.exports = writer;