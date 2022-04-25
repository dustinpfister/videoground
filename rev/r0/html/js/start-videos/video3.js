
// init method for the video
VIDEO.init = function(scene, camera){
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
VIDEO.update = function(state, scene, camera, per, bias){
    let mesh = scene.userData.mesh;
    mesh.position.x = -4 + 6 * state.bias;
    mesh.rotation.y = Math.PI * 4 * state.per;
};

