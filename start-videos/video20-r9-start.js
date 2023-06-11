/*    video19-r8-start - start video for r9 of videoground
 */
VIDEO.init = function(sm, scene, camera){

    const material = new THREE.MeshNormalMaterial();
    const mesh1 = scene.userData.mesh1 = new THREE.Mesh( new THREE.BoxGeometry(1, 1, 1), material );
    scene.add(mesh1);
    camera.position.set(2, 2, 2);
    camera.lookAt( 0, 0, 0 );
};
// update method for the video
VIDEO.update = function(sm, scene, camera, per, bias){
    const mesh1 = scene.userData.mesh1;
    mesh1.rotation.x = Math.PI * 2 * per;
};

