const path = require('path');
const fs = require('fs');
const promisify = require('util').promisify;
const open = promisify(fs.open);
const fstat = promisify(fs.fstat);
const close = promisify(fs.close);
const read = promisify(fs.read);

const uri = path.join(__dirname, '../../README.md');
let file_fd = null;
let file_stat = null;
open(uri, 'r+')
.catch((e)=>{
    console.warn('error opening file.');
    console.warn(e);
})
.then((fd) => {
    console.warn('fd:' + fd);
    file_fd = fd;
    return fstat(file_fd)
})
.then((stat) => {
    file_stat = stat;
    const buffer = new Buffer.alloc( 32 );
    const file_byte_start = file_stat.size - 32;
    return read(file_fd, buffer, 0, buffer.length, file_byte_start);
})
.then( (data) => {
    console.log(data.buffer.toString())
    return close(file_fd)
})