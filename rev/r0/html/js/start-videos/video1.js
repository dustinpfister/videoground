
// init method for the video
VIDEO.init = function(scene, camera){
    // GRID HELPER
    scene.add(new THREE.GridHelper(8, 8));
    // MESH
    let mesh = scene.userData.mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
    mesh.position.set(0, 0, 0);
    scene.add(mesh);
};

// update method for the video
VIDEO.update = function(state, scene, camera, per, bias){
    let mesh = scene.userData.mesh;
    mesh.position.x = -4 + 8 * state.bias;
};

