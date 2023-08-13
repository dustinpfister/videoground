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


VIDEO.init = function(sm, scene, camera){
    sm.renderer.setClearColor(0x000000, 0.25);

    const sine = scene.userData.sine = {
        amplitude: 1.00,
        wave_count: 5,
        sample_rate: 8000,
        secs: 4,
        disp_offset: new THREE.Vector2(50, 200),
        disp_size: new THREE.Vector2( 1280 - 100, 200),
        v2array: [],
        frames: 0
    };

    sine.frames = 30 * sine.secs;

    // create v2array for sine object when each vector2 is an index for x, sample value for the frame
    // this is used for just a vishual state so the number of objects should not be more that the size 
    // of the display
    let i = 0;
    const w = sine.disp_size.x;
    while(i < w){
        const a_size = ( i / w );
        const y = Math.sin( Math.PI * 2 * sine.wave_count * a_size )  * sine.amplitude;
        const v2 = new THREE.Vector2( i, y );
        sine.v2array.push( v2 );
        i += 1;
    }

    sm.frameMax = sine.frames;

    camera.position.set(2, 2, 2);
    camera.lookAt( 0, 0, 0 );

};
// update method for the video
VIDEO.update = function(sm, scene, camera, per, bias){
    const sine = scene.userData.sine;
    const v2 = sine.v2array[ Math.floor( sine.disp_size.x * sm.per ) ];
    const sin = v2.y;
    let byte = Math.round( 127.5 + 128 * sin );
    byte = THREE.MathUtils.clamp(byte, 0, 255);


    console.log( ' sin= '+ sin.toFixed(2) + 'byte=' + byte );
    // for this project the byte value is just what will be set for all samples
    let i_sample = 0;
    const data_samples = [];
    while(i_sample < sine.sample_rate){
        data_samples.push( byte );
        i_sample += 1;
    };

    // write data_samples array
    //console.log( data_samples.join(',') )

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


