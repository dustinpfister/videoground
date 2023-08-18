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
writer.append = (uri, data = new Uint8Array(), clear = true ) => {



    // resolve '~' to home folder location
    if (uri[0] === '~') {
        uri = path.join( process.env.HOME, uri.slice( 1 ) );
    }

    let buff = Buffer.from( data );

    if( data instanceof Int16Array ){
        const word_count = data.length;
        buff = Buffer.alloc( word_count * 2 );
        let i = 0;
        while(i < word_count){
            buff.writeInt16LE( data[i], i * 2 )
            i += 1;
        }
        console.log('looka like we have an Int16Array');
        console.log(buff)
        console.log(buff.length)
    }

    if(clear){
        return write(uri, buff);
    }
    return write(uri, buff, { flag: 'a+' });
};

// exporting API
module.exports = writer;