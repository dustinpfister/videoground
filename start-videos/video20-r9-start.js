/*    video20-r9-start - start video for r9 of videoground
      * VIDEO.render method added in r9 used for the background and rendering of scene in area of canvas
 */
VIDEO.init = function(sm, scene, camera){
    sm.renderer.setClearColor(0x000000, 0.25);
    const material = new THREE.MeshNormalMaterial();
    const mesh1 = scene.userData.mesh1 = new THREE.Mesh( new THREE.BoxGeometry(1, 1, 1), material );
    scene.add(mesh1);
    camera.position.set(2, 2, 2);
    camera.lookAt( 0, 0, 0 );
    // videoAPI.read can still be used to read a full file like this
    const uri_file = videoAPI.pathJoin(sm.filePath, 'video1-r1-start.js')
    return videoAPI.read( uri_file, { alpha: 0, buffer_size_alpha: 1} )
    .then( (data) => {
        const text = data
        scene.userData.lines = text.split( /\n/ );
        scene.userData.text = text;
    });
};
// custom render function
VIDEO.render = function(sm, canvas, ctx, scene, camera, renderer){
   // plain 2d canvas drawing context for background
   const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
   gradient.addColorStop(0, 'pink');
   gradient.addColorStop(0.5, 'cyan');
   gradient.addColorStop(0.75, '#4422ff');
   ctx.fillStyle = gradient;
   ctx.fillRect(0,0, canvas.width, canvas.height);
   // text in background loaded using videoAPI.read in int method
   ctx.fillStyle = 'black';
   ctx.font = '40px monospace';
   scene.userData.lines.forEach( (text, i) => {
       ctx.fillText(text, 0, 40 * i - (40 * 20) * sm.per);
   });
   ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
   ctx.fillRect(0,0, canvas.width, canvas.height);
   // update and draw dom element of renderer
   sm.renderer.render(sm.scene, sm.camera);
   const dx = sm.canvas.width * 0.4, 
   dy = sm.canvas.width * (0.05 + 0.15 * sm.bias);
   const dw = sm.canvas.width * 0.5;
   const dh = sm.canvas.height * 0.5;
   ctx.drawImage(sm.renderer.domElement, dx, dy, dw, dh);
   // addtional plain 2d overlay for status info
   ctx.fillStyle = 'black';
   ctx.font = '40px arial';
   ctx.textBaseline = 'top';
   ctx.fillText('frame: ' + sm.filePath, 5, 10);
   ctx.fillText('frame: ' + sm.frame + '/' + sm.frameMax, 5, 60);
   ctx.fillText('a_per: ' + sm.per.toFixed(2), 5, 110);
};
// update method for the video
VIDEO.update = function(sm, scene, camera, per, bias){
    const mesh1 = scene.userData.mesh1;
    mesh1.rotation.x = Math.PI * 2 * per;
    mesh1.rotation.y = Math.PI * 4 * per;
};

