/*    video21-r10-start - start video for r10 of videoground
 */
//-------- ----------
// CREATE SINE POINTS METHIOD
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
//-------- ----------
// DRAW SAMPLE DATA - AND RELATED METHODS
//-------- ----------
const getsamp_lossy_random = (sample_array, i, index_step) => {
    const a = THREE.MathUtils.seededRandom(i);
    const i_delta = Math.floor(a * index_step);
    const samp = sample_array[i + i_delta];
    return samp;
};
const getsamp_lossy_pingpong = (function(){
    let high = 0;
    return ( sample_array, i, index_step ) => {
        const frame_samps = sample_array.slice( i, i + index_step );
        const a = Math.max.apply(null, frame_samps);
        const b = Math.min.apply(null, frame_samps);
        let samp = b;
        if(high){
            samp = a;
        }
        high += 1;
        high %= 2;
        return samp;
    };
}());
const draw_sample_data = (ctx, sample_array, opt = {} ) => {
    const sx = opt.sx === undefined ? 0 : opt.sx;
    const sy = opt.sy === undefined ? 0 : opt.sy;
    const w = opt.w === undefined ? 100 : opt.w;
    const h = opt.h === undefined ? 25 : opt.h;
    const getsamp_lossy = opt.getsamp_lossy || function(sample_array, i ){ return sample_array[i]; };
    const mode = opt.mode || 'raw';
    const sample_count = sample_array.length;
    const disp_hh = h / 2;
    let index_step = 1;
    if( sample_count >= w ){
        index_step = Math.floor( sample_count / w );
    }   
    ctx.strokeStyle = 'lime';
    ctx.linewidth = 3;
    ctx.beginPath();
    let i = 0;
    while(i < sample_count){
        const x = sx + w * ( i / sample_count );
        let samp = 0;
        if( index_step === 1 ){
           samp = sample_array[ i ];
        }
        if(index_step > 1){
           samp = getsamp_lossy(sample_array, i, index_step);
        }
        if(mode === 'bytes'){
            samp = -1 + (samp / 255) * 2;
        }
        const y = sy + disp_hh + samp * disp_hh;
        if(i === 0){
            ctx.moveTo(x, y);
        }
        if(i > 0){
            ctx.lineTo(x, y);
        }
        i += index_step;
    }
    ctx.lineWidth = 3;
    ctx.stroke();
};
const draw_sample_box = (ctx, opt, alpha = 0) => {
    const sx = opt.sx === undefined ? 0 : opt.sx;
    const sy = opt.sy === undefined ? 0 : opt.sy;
    const w = opt.w === undefined ? 100 : opt.w;
    const h = opt.h === undefined ? 25 : opt.h;
    ctx.strokeStyle = 'lime';
    ctx.lineWidth = 6;
    ctx.strokeRect(sx, sy, w, h);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
    ctx.fillRect(sx, sy, w * alpha, h);
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
        array_disp: [],   // data for whole sound
        array_frame: [],  // data for current frame
        frames: 0
    };
    sine.frames = 30 * sine.secs;
    sine.bytes_per_frame = Math.floor(sine.sample_rate / 30 );
    sm.frameMax = sine.frames;
    const total_bytes = sine.sample_rate * sine.secs;
    sine.array_disp = create_sine_points_3({
        i_size: total_bytes,
        i_start:0,
        i_count: total_bytes,
        frequency: sine.frequency,
        secs: sine.secs,
        mode: 'raw'
    });
    //!!! might not need to do anything with cameras if renderer dome element is not used in render process
    //camera.position.set(2, 2, 2);
    //camera.lookAt( 0, 0, 0 );
};
//-------- ----------
// UPDATE
//-------- ----------
VIDEO.update = function(sm, scene, camera, per, bias){
    const sine = scene.userData.sine;
    const total_bytes = sine.sample_rate * sine.secs;
    const i_start = sine.bytes_per_frame * sm.frame;
    const data_samples =  sine.array_frame = create_sine_points_3({
        i_size : total_bytes,
        i_start : i_start,
        i_count : sine.bytes_per_frame,
        frequency: sine.frequency,
        secs: sine.secs,
        amplitude: sine.amplitude,
        mode: 'bytes'
    });
    // write data_samples array
    const clear = sm.frame === 0 ? true: false;
    const uri = videoAPI.pathJoin(sm.filePath, 'vg-sampdata');
    return videoAPI.write(uri, new Uint8Array(data_samples), clear )
};
//-------- ----------
// RENDER
//-------- ----------
const opt_disp = { w: 1280 - 50 * 2, h: 250, sy: 100, sx: 50, getsamp_lossy: getsamp_lossy_pingpong };
const opt_frame = { w: 1280 - 50 * 2, h: 250, sy: 400, sx: 50, mode: 'bytes' };
VIDEO.render = function(sm, canvas, ctx, scene, camera, renderer){
    const sine = scene.userData.sine;
    // background
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0, canvas.width, canvas.height);
    // update and draw dom element of renderer
    // this might just be 2d, but for now I will keep this here
    //sm.renderer.render(sm.scene, sm.camera);
    //ctx.drawImage(sm.renderer.domElement, 0, 0, canvas.width, canvas.height);



    draw_sample_data(ctx, sine.array_disp, opt_disp );
    draw_sample_box(ctx, opt_disp, sm.per );
    draw_sample_data(ctx, sine.array_frame, opt_frame );
    draw_sample_box(ctx, opt_frame, 0 );

    // draw a cursor
    //ctx.strokeStyle = 'white';
    //ctx.lineWidth = 6;
    //let cursor = new THREE.Vector2();
    //cursor.copy( get_disp_v2(sine, sine.array_disp, Math.floor( sine.disp_size.x * sm.per ) ) );
    //ctx.beginPath();
    //ctx.arc(cursor.x, cursor.y, 20, 0, Math.PI * 2);
    //ctx.stroke();

    // additional plain 2d overlay for status info
    ctx.fillStyle = 'lime';
    ctx.font = '25px courier';
    ctx.textBaseline = 'top';
    ctx.fillText('frame: ' + sm.frame + '/' + sm.frameMax, 5, 5);
    ctx.fillText('sample rate : ' + sine.sample_rate + ' Hz, frequency: ' + sine.frequency + ' Hz' , 5, 35);
    ctx.fillText('bytes_per_frame: ' + sine.bytes_per_frame, 5, 60);
};

