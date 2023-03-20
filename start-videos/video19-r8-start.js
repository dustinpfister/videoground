/*    video19-r8-start - start video for r8 of videoground
 */
VIDEO.init = function(sm, scene, camera){

    const material_1 = new THREE.MeshNormalMaterial({wireframe:true});

    const mesh1 = new THREE.Mesh( new THREE.SphereGeometry(0.5, 20, 20), material_1 );
    scene.add(mesh1);

    const mesh2 = scene.userData.mesh2 = new THREE.Mesh( new THREE.CylinderGeometry(0.25,0.25, 2, 10, 10), material_1 );
    mesh2.geometry.translate(0, -1.5 ,0)
    scene.add(mesh2);

    camera.position.set(3, 1, 3);
    camera.lookAt( 0, 0, 0 );

};
// update method for the video
VIDEO.update = function(sm, scene, camera, per, bias){
    const mesh2 = scene.userData.mesh2;
    mesh2.rotation.x = Math.PI * 2 * per;
};

