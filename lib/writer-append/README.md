# writer-append

The deal with this lib is to have a write funciton that will create a file if it is not there, and append data to it for each frame.


### Write Int16Arrays

```js
const int16 = new Int16Array( [ 514, 1] )
const word_count = int16.length;
const buff = Buffer.alloc( word_count * 2 );
let i = 0;
while(i < word_count){
    buff.writeInt16LE( int16[i], i * 2 )
    i += 1;
}
console.log(buff.length);
console.log(buff);
```