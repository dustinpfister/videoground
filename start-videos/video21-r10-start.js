/*    video21-r10-start - start video for r10 of videoground
 */
//-------- ----------
// HELPER FUNCTIONS
//-------- ----------
// create sine points array
const create_sine_points_3 = ( opt = {} ) => {

    const i_size = opt.i_size === undefined ? 20 : opt.i_size;
    const i_start = opt.i_start === undefined ? 8 : opt.i_start;
    const i_count = opt.i_count === undefined ? 8 : opt.i_count;
    const frequency = opt.frequency === undefined ? 1 : opt.frequency;
    const secs = opt.secs === undefined ? 1 : opt.secs;
    const amplitude = opt.amplitude === undefined ? 0.75 : opt.amplitude;
    const mode = opt.mode === undefined ? 'bytes' : opt.mode;
    const step = opt.step === undefined ? 1 : opt.step; 

    const sine_points = [];
    const wave_count = frequency * secs;
    const i_end = i_start + i_count;
    let i = i_start;
    while(i < i_end){
        const a_point = i / i_size;
        let samp = Math.sin( Math.PI * 2 * wave_count * a_point )  * amplitude;
        if(mode === 'bytes'){
            let byte = Math.round( 127.5 + 128 * samp );
            samp = THREE.MathUtils.clamp(byte, 0, 255);
        }
        if(mode === 'normal'){
            samp = ( samp + 1 ) / 2;
            samp = THREE.MathUtils.clamp(samp, 0, 1);
        }
        sine_points.push( parseFloat( samp.toFixed(2)) );
        i += step;
    }
    return sine_points;
};

const standard_deviation = (array) => {
    if( !array || array.length === 0){
         return 0;
    }
    const n = array.length
    const mean = array.reduce((a, b) => a + b) / n
    return Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
};

const get_mean = (array) => {
    if( !array || array.length === 0){
         return 0;
    }
    return array.reduce( (acc, n) => { return acc + n  }, 0 ) / array.length;
};

// get a display v2 point with the given sine object an index
const get_disp_v2 = (sine, index = 0) => {
    const v2 = new THREE.Vector2(index, sine.array_disp[ index ] );
    const w = sine.disp_size.x, h = sine.disp_size.y, hh = h/2;
    const v2_pos = new THREE.Vector2();
    v2_pos.x = sine.disp_offset.x + ( v2.x / w ) * sine.disp_size.x;
    v2_pos.y = sine.disp_offset.y + hh + v2.y * hh * -1;
    return v2_pos;
};
// create the v2 array display
const create_array_disp = (sine, a_frame = 0.25 ) => {
    const size = sine.disp_size.x;
    const bytes_per_frame = Math.floor(sine.sample_rate / 30 );
    const total_bytes = sine.sample_rate * sine.secs;
    const array_disp = [];
    let i = 0;
    while(i < size){
         const a_disp = i / size;
         const frame = Math.floor(sine.secs * 30 * a_disp);
         const i_start = bytes_per_frame * frame;

         const data_samples =  create_sine_points_3({
             i_size : total_bytes,
             i_start : i_start,
             //i_count : bytes_from_frame,
             i_count : bytes_per_frame,
             frequency: sine.frequency,
             secs: sine.secs,
             amplitude: sine.amplitude,
             mode: 'raw',
             step: Math.floor(bytes_per_frame * a_frame)
         });





         //!!! not sure how best to do this
         // just taking a mean, or the highest and lowest does not work so great

const mean = get_mean(data_samples);
const dev = standard_deviation(data_samples);


         //array_disp.push( mean);
         //array_disp.push( -1 + mean * 2 );

         const a = Math.max.apply(null, data_samples );
         const b = Math.min.apply(null, data_samples );
         let n = a;

         if( Math.abs( b ) >= a ){
             n = b;
         }

         //array_disp.push( n * ( mean * data_samples.length ) );

         array_disp.push( n );
         //array_disp.push( mean  );
         //array_disp.push( dev);
         //array_disp.push( dev * n );


         //const c = n * ( mean * data_samples.length );
         //const d = THREE.MathUtils.clamp(c, -1, 1);
         //array_disp.push( d );


if(i === 0){
    console.log(data_samples);
    console.log( mean );
    console.log( dev );
    console.log( a, b );
}


         i += 1;
    }
    return array_disp;
};
//-------- ----------
// INIT
//-------- ----------
VIDEO.init = function(sm, scene, camera){
    sm.renderer.setClearColor(0x000000, 0.25);
    const sine = scene.userData.sine = {
        amplitude: 0.65,
        frequency: 80,
        sample_rate: 8000,
        secs: 3,
        disp_offset: new THREE.Vector2(50, 200),
        disp_size: new THREE.Vector2( 1280 - 100, 200),
        array_disp: [],
        frames: 0
    };
    sine.frames = 30 * sine.secs;
    sine.array_disp = create_array_disp(sine, 0.1 );
    sm.frameMax = sine.frames;

    //!!! might not need to do anything with cameras if renderer dome element is not used in render process
    //camera.position.set(2, 2, 2);
    //camera.lookAt( 0, 0, 0 );

};
// update method for the video
VIDEO.update = function(sm, scene, camera, per, bias){
    const sine = scene.userData.sine;

    const bytes_per_frame = Math.floor(sine.sample_rate / 30 );
    const total_bytes = sine.sample_rate * sine.secs;
    const i_start = bytes_per_frame * sm.frame;

    const data_samples =  create_sine_points_3({
        i_size : total_bytes,
        i_start : i_start,
        i_count : bytes_per_frame,
        frequency: sine.frequency,
        secs: sine.secs,
        amplitude: sine.amplitude,
        mode: 'bytes'
    });

    // write data_samples array
    const clear = sm.frame === 0 ? true: false;
    const uri = videoAPI.pathJoin(sm.filePath, 'v21-sampdata'); // '~/vg-samp-data'
    return videoAPI.write(uri, new Uint8Array(data_samples), clear )

};

// custom render function
VIDEO.render = function(sm, canvas, ctx, scene, camera, renderer){
    const sine = scene.userData.sine;

    // background
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0, canvas.width, canvas.height);

    // update and draw dom element of renderer
    // this might just be 2d, but for now I will keep this here
    //sm.renderer.render(sm.scene, sm.camera);
    //ctx.drawImage(sm.renderer.domElement, 0, 0, canvas.width, canvas.height);

    // draw sine disp
    ctx.strokeStyle = 'lime';
    ctx.lineWidth = 3;
    const sx = sine.disp_offset.x, sy = sine.disp_offset.y;
    const w = sine.disp_size.x, h = sine.disp_size.y, hh = h / 2;
    ctx.strokeRect(sx, sy , w, h);
    ctx.beginPath();
    let i = 0;
    while(i < w){
        const v2_pos = get_disp_v2(sine, i);
        if(i === 0){
            ctx.moveTo(v2_pos.x, v2_pos.y);
        }
        if(i > 0){
            ctx.lineTo(v2_pos.x, v2_pos.y);
        }
        i += 1;
    }
    ctx.stroke();

    // draw a cursor
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 6;
    let cursor = new THREE.Vector2();
    cursor.copy( get_disp_v2(sine, Math.floor( sine.disp_size.x * sm.per ) ) );
    ctx.beginPath();
    ctx.arc(cursor.x, cursor.y, 20, 0, Math.PI * 2);
    ctx.stroke();

    // additional plain 2d overlay for status info
    ctx.fillStyle = 'lime';
    ctx.font = '40px courier';
    ctx.textBaseline = 'top';
    ctx.fillText('frame: ' + sm.frame + '/' + sm.frameMax, 5, 10);
};

