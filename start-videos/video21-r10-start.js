/*    video21-r10-start - start video for r10 of videoground
 */
VIDEO.init = function(sm, scene, camera){
    sm.renderer.setClearColor(0x000000, 0.25);

    const sine = scene.userData.sine = {
        amplitude: 0.80,
        hertz: 10,
        secs: 5,
        disp_offset: new THREE.Vector2(50, 200),
        disp_size: new THREE.Vector2( 1280 - 100, 200),
        v2array: [],
        frames: 0
    };

    sine.frames = 30 * sine.secs;

    // create v2array for sine object when each vector2 is a frame index for x, and a sine value for y
    let i = 0;
    while(i < sine.frames){
        const a_frame = ( i / sine.frames );
        const a_sin = sine.secs * sine.hertz * a_frame;
        const y = Math.sin( Math.PI * a_sin ) * sine.amplitude;
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
    const v2 = sine.v2array[ sm.frame ];
    const sin = v2.y;
    let byte = Math.round( 127.5 + 128 * sin );
    byte = THREE.MathUtils.clamp(byte, 0, 255);

    console.log( ' sin= '+ sin.toFixed(2), 'byte=' + byte );


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

    // just draw sine disp
    ctx.strokeStyle = 'lime';
    ctx.lineWidth = 3;
    const sx = sine.disp_offset.x, sy = sine.disp_offset.y;
    const w = sine.disp_size.x, h = sine.disp_size.y, hh = h/2;
    ctx.strokeRect(sx, sy , w, h);

    ctx.beginPath();
    let cursor = new THREE.Vector2();
    sine.v2array.forEach( (v2, i) => {
        const v2_pos = new THREE.Vector2();
        v2_pos.x = sine.disp_offset.x + (v2.x / sine.frames) * sine.disp_size.x;
        v2_pos.y = sine.disp_offset.y + hh + v2.y * hh * -1;
        if(i === 0){
            ctx.moveTo(v2_pos.x, v2_pos.y);
        }
        if(i > 0){
            ctx.lineTo(v2_pos.x, v2_pos.y);
        }
        if(i === sm.frame){
           cursor.copy(v2_pos);
        }
    });
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cursor.x, cursor.y, 20, 0, Math.PI * 2);
    ctx.stroke();


    // additional plain 2d overlay for status info
    //ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    //ctx.fillRect(0,0, canvas.width, canvas.height * 0.25);
    ctx.fillStyle = 'lime';
    ctx.font = '40px courier';
    ctx.textBaseline = 'top';
    ctx.fillText('frame: ' + sm.frame + '/' + sm.frameMax, 5, 10);
};


