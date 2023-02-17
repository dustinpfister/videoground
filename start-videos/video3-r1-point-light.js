/*     video3 - Point light example
 *       
 *       
 */
// init method for the video
VIDEO.init = function(sm, scene, camera){
    // static camera
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 0, 0);
    // GRID HELPER
    scene.add(new THREE.GridHelper(8, 4));
    // light
    let light = new THREE.PointLight();
    light.position.set(0,2,3)
    scene.add(light);
    // MESH
    let mesh = scene.userData.mesh = new THREE.Mesh(
        new THREE.BoxGeometry(3, 2, 2),
        new THREE.MeshStandardMaterial());
    scene.add(mesh);
};

// update method for the video
VIDEO.update = function(sm, scene, camera, per, bias){
    let mesh = scene.userData.mesh;
    mesh.position.x = -4 + 6 * sm.bias;
    mesh.rotation.y = Math.PI * 4 * sm.per;
};

