/*    video24-r10-export-done - video for r10 of videoground
          * testing out export done feature
 */
//-------- ----------
// INIT
//-------- ----------
VIDEO.init = (sm, scene, camera) => {
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
VIDEO.export_done = () => {
    console.log('export done!');
};

