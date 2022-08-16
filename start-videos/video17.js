/*     video17 - webgl2 test
 *       
 *       
 */
// init method for the video
VIDEO.init = function(sm, scene, camera){
    // static camera
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 0, 0);
    // GRID HELPER
    var grid = new THREE.GridHelper(10, 10);
    grid.material.linewidth = 3;
    scene.add(grid);

    scene.background = new THREE.Color(0.2, 0, 0);

    // MESH
    let mesh = scene.userData.mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
    mesh.position.set(0, 0, -5);
    scene.add(mesh);

    if(sm.renderer.capabilities.isWebGL2){
        scene.background = new THREE.Color(0, 0.2, 0);
    }

};

// update method for the video
VIDEO.update = function(sm, scene, camera, per, bias){
    let mesh = scene.userData.mesh;
    mesh.position.x = -4 + 8 * sm.bias;
};

