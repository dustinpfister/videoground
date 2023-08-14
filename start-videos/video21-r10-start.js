/*    video21-r10-start - start video for r10 of videoground
 */

const get_disp_v2 = (sine, index = 0) => {
    const v2 = sine.v2array[index];
    const w = sine.disp_size.x, h = sine.disp_size.y, hh = h/2;
    const v2_pos = new THREE.Vector2();
    v2_pos.x = sine.disp_offset.x + (v2.x / w) * sine.disp_size.x;
    v2_pos.y = sine.disp_offset.y + hh + v2.y * hh * -1;
    return v2_pos;
};

const create_sine_points = ( i_start, i_end, waves_per_sec = 5, secs = 3, amplitude = 0.5 ) => {
   const sine_points = [];
    let i = i_start;
    while(i < i_end){
        const a_size = ( ( i - i_start ) / i_end );
        const wave_count = waves_per_sec * secs;
        const y = Math.sin( Math.PI * 2 * wave_count * a_size )  * amplitude;
        const v2 = new THREE.Vector2( i, y );
        sine_points.push( v2 );
        i += 1;
    }
    return sine_points;
};

const create_sine_points_2 = ( i_size = 20, i_start = 8, i_count = 3, waves_per_sec = 1, secs = 1, amplitude = 0.5, mode = 'bytes' ) => {
    const sine_points = [];
    const wave_count = waves_per_sec * secs;
    const i_end = i_start + i_count;
    let i = i_start;

    while(i < i_end){
        const a_point = i / i_size;
        let samp = Math.sin( Math.PI * 2 * wave_count * a_point )  * amplitude;
        if(mode === 'bytes'){
            let byte = Math.round( 127.5 + 128 * samp );
            samp = THREE.MathUtils.clamp(byte, 0, 255);
        }
        sine_points.push( parseFloat( samp.toFixed(2)) );
        i += 1;
    }
    return sine_points;
};

//console.log( create_sine_points_2() );

VIDEO.init = function(sm, scene, camera){
    sm.renderer.setClearColor(0x000000, 0.25);
    const sine = scene.userData.sine = {
        amplitude: 0.80,
        waves_per_sec: 80,
        sample_rate: 8000,
        secs: 1,
        disp_offset: new THREE.Vector2(50, 200),
        disp_size: new THREE.Vector2( 1280 - 100, 200),
        v2array: [],
        frames: 0
    };
    sine.frames = 30 * sine.secs;

    // create v2array for sine object when each vector2 is an index for x, sample value for the frame
    // this is used for just a visual state so the number of objects should not be more that the size 
    // of the display
    sine.v2array = create_sine_points(0, sine.disp_size.x, sine.waves_per_sec, sine.secs, sine.amplitude);

    sm.frameMax = sine.frames;

    //!!! might not need to do anything with cameras if renderer dome element is not used in render process
    //camera.position.set(2, 2, 2);
    //camera.lookAt( 0, 0, 0 );

};
// update method for the video
VIDEO.update = function(sm, scene, camera, per, bias){
    const sine = scene.userData.sine;

    const bytes_per_frame = Math.floor(sine.sample_rate / 30);
    const total_bytes = sine.sample_rate * sine.secs;
    const i_start = bytes_per_frame * sm.frame;
    const data_samples = create_sine_points_2( total_bytes, i_start, bytes_per_frame, sine.waves_per_sec, sine.secs, sine.amplitude, 'bytes' );

    console.log(data_samples);

    // write data_samples array
    //const clear = sm.frame === 0 ? true: false;
    //const uri = videoAPI.pathJoin(sm.filePath, 'v21-sampdata'); // '~/vg-samp-data'
    //return videoAPI.write(uri, new Uint8Array(data_samples), clear )

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
    const w = sine.disp_size.x, h = sine.disp_size.y, hh = h/2;
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


