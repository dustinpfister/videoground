/*    video21-r10-start - start video for r10 of videoground
 */
VIDEO.init = function(sm, scene, camera){
    sm.renderer.setClearColor(0x000000, 0.25);

    camera.position.set(2, 2, 2);
    camera.lookAt( 0, 0, 0 );

};
// custom render function
VIDEO.render = function(sm, canvas, ctx, scene, camera, renderer){
   ctx.fillStyle = 'black';
   ctx.fillRect(0,0, canvas.width, canvas.height);

   // update and draw dom element of renderer
   sm.renderer.render(sm.scene, sm.camera);
   ctx.drawImage(sm.renderer.domElement, 0, 0, canvas.width, canvas.height);
   // addtional plain 2d overlay for status info
   //ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
   //ctx.fillRect(0,0, canvas.width, canvas.height * 0.25);
   ctx.fillStyle = 'lime';
   ctx.font = '40px courier';
   ctx.textBaseline = 'top';
   ctx.fillText('frame: ' + sm.frame + '/' + sm.frameMax, 5, 10);
};
// update method for the video
VIDEO.update = function(sm, scene, camera, per, bias){
};

