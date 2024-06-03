const path = require('path');
const writer = require( path.join(__dirname, 'writer-append.js') );
//-------- ----------
// TEST
//-------- ----------

const uri = '~/debug_vg_append_writer/frames/frame_0001.txt';

const header_bytes = new Uint8Array([65, 65, 65, 65, 10]);
writer.append(uri, header_bytes, true )
.then(()=>{
    let i_samp = 0;
    const loop_smap = () => {
        const data_bytes = Buffer.from(i_samp + '\n');
        writer.append(uri, data_bytes, false )
        .then(() => {
            i_samp += 1;
            if(i_samp < 10){
                loop_samp();
            }
        });
    };
    loop_samp();
});

