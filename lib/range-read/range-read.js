const path = require('path');
const fs = require('fs');
const promisify = require('util').promisify;
const open = promisify(fs.open);
const fstat = promisify(fs.fstat);
const close = promisify(fs.close);
const read = promisify(fs.read);

//-------- ----------
// PUPLIC API 
//-------- ----------
const rangeRead = {};
// read a file by uisng fs.open, fs.fstat, fs.read, and fs.close thus allowing
// for reading just part of a file, and by having access to file stat info can do so
// in a way in which alpha values relative to full file size can be used
rangeRead.read = ( uri, opt = {} ) => {
    // parse options
    opt = opt || {};
    opt.mode = opt.mode || 'r+';
    // start a 'file' object that will store all internal state data for this
    const file = {
       fd: null,
       stat: null,
       buffer: new Buffer.alloc( opt.buffer_size )
    };
    // return a promise that will resolve to a buffer of all goes well
    return open(uri, opt.mode)
    // if fs.open call works fine, set file.fd to the fd, and call fstat with the fd 
    .then((fd) => {
        file.fd = fd;
        return fstat(file.fd);
    })
    // if fs.fstat works out fine, set value of file.stat, and call read
    .then((stat) => {
        file.stat = stat;
        const file_byte_start = file.stat.size - opt.buffer_size;
        return read(file.fd, file.buffer, 0, file.buffer.length, file_byte_start);
    })
    // close the file
    .then( (data) => {
        return close(file.fd);
    })
    // return the buffer
    .then( ()=> {
        return file.buffer;
    })
};
// exporting rangeRead API
module.exports = rangeRead;