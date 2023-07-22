const path = require('path');
const rangeRead = require( path.join(__dirname, 'range-read.js') );
//-------- ----------
// TESTING OUT READ - using the README of this Project and hard coded settings
//-------- ----------
const uri = path.join(__dirname, 'README.md');
const opt = {
   buffer_size: 64,
   alpha: 0.25
};
rangeRead.read(uri, opt)
.then( (text) => {
    console.log('output:');
    console.log( text.toString() );
})
.catch( (e) => {
    console.warn(e);
});