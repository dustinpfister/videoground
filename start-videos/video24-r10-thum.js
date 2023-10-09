/*    video24-r10-thum - video for r10 of videoground
          * testing out new thumbnail features
 */
//-------- ----------
// INIT
//-------- ----------
VIDEO.init = function(sm, scene, camera){
    sm.renderer.setClearColor(0x000000, 0.25);
    
    const grid = new THREE.GridHelper( 10, 10 );
    scene.add(grid);


    const geometry = new THREE.SphereGeometry(1, 40, 40, 0, 1.57)
    const material = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide });
    const mesh = new THREE.Mesh(geometry, material );
    scene.add(mesh)


    camera.position.set(5, 2, 5);
    camera.lookAt( 0, 0, 0 );

    sm.frameMax = 30;

};
//-------- ----------
// UPDATE
//-------- ----------
VIDEO.update = function(sm, scene, camera, per, bias){
    camera.position.set(5 - 10 * per, 2, 5);
    camera.lookAt( 0, 0, 0 ); 
};
//-------- ----------
// RENDER
//-------- ----------
VIDEO.render = function(sm, canvas, ctx, scene, camera, renderer){

    // background
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0, canvas.width, canvas.height);


    sm.renderer.render(sm.scene, sm.camera);
    ctx.drawImage(sm.renderer.domElement, 0, 0, canvas.width, canvas.height);

};

