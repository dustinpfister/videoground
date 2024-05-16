/*    video24-r10-export-done - video for r10 of videoground
          * testing out export done feature
 */
//-------- ----------
// INIT
//-------- ----------
VIDEO.init = (sm, scene, camera) => {

console.log(THREE.REVISION);

    sm.renderer.setClearColor(0x000000, 0.25);
    
    scene.add( new THREE.GridHelper( 10, 10 ) );
    scene.add( new THREE.Mesh( new THREE.BoxGeometry( 3, 3, 3 ), new THREE.MeshDepthMaterial() ) );
    
    sm.frameMax = 30;
};
//-------- ----------
// UPDATE
//-------- ----------
VIDEO.update = (sm, scene, camera, per, bias) => {
    camera.position.set(8.0 - 16 * per, 3.5, 6.0);
    camera.near = 4.00;
    camera.far = 100.0;
    camera.updateProjectionMatrix();
    camera.lookAt( 0, 0, 0 ); 
};
//-------- ----------
// RENDER
//-------- ----------
VIDEO.render = (sm, canvas, ctx, scene, camera, renderer) => {
    // background
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0, canvas.width, canvas.height);
    // forground
    sm.renderer.render(sm.scene, sm.camera);
    ctx.drawImage(sm.renderer.domElement, 0, 0, canvas.width, canvas.height);
};
//-------- ----------
// EXPORT DONE
//-------- ----------
VIDEO.export_done = (sm) => {
    
    // commands used for video only, and video + audio
    // ffmpeg -framerate 30 -i frame-%06d.png -pix_fmt yuv420p raw.mp4
    // ffmpeg -framerate 30 -i frame-%06d.png -i video.wav -b:a 192k -pix_fmt yuv420p raw.mp4
    
    // Maybe use this feature to audomate cleanup?
    // find frame-*.png -delete
    
    const in_file = videoAPI.pathJoin( sm.imageFolder, 'frame-%06d.png' );
    const out_file = videoAPI.pathJoin( sm.imageFolder, 'raw.mp4' );
    const exec_line = 'ffmpeg -y -framerate 30 -i ' + in_file + ' -pix_fmt yuv420p ' + out_file;
    const clean_line = 'find ' + videoAPI.pathJoin( sm.imageFolder, 'frame-*.png') + ' -delete';
    
    videoAPI.exec( exec_line )
    .then( (data) => {
        console.log( 'looks like that went well' );
        return videoAPI.exec(clean_line);
    })
    .then( (data) => {
        console.log('clean up is done');
        console.log(data)
    });
    
};

