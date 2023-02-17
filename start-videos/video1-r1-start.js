/*     video1 - The first very simple video that I started with in which
 *       I am just moving a cube back and forth
 *       
 */
// init method for the video
VIDEO.init = function(sm, scene, camera){
    // static camera
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 0, 0);
    // GRID HELPER
    scene.add(new THREE.GridHelper(8, 8));
    scene.background = new THREE.Color(0, 1, 1);
    // MESH
    let mesh = scene.userData.mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
    mesh.position.set(0, 0, 0);
    scene.add(mesh);
};
// update method for the video
VIDEO.update = function(sm, scene, camera, per, bias){
    let mesh = scene.userData.mesh;
    mesh.position.x = -4 + 8 * sm.bias;
};
