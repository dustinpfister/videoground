/*    video18-r7-start - start video for r7 of videoground
 *        * mesh object using box geometry and basic material
 *        * line object added as child of mesh with edge geometry made from same box geometry
 */
VIDEO.init = function(sm, scene, camera){
    // camera
    camera.position.set(1.5, 1.5, 1.5);
    camera.lookAt(0, 0, 0);
    // background
    scene.background = new THREE.Color(0.2, 0.2, 0.2);
    // geometry
    const geometry_mesh = new THREE.BoxGeometry(1, 1, 1);
    const geometry_line = new THREE.EdgesGeometry(geometry_mesh);
    // mesh
    const mesh = scene.userData.mesh = new THREE.Mesh(
        geometry_mesh,
        new THREE.MeshBasicMaterial({ color: new THREE.Color(0,0,0) }));
    scene.add(mesh);
    // mesh
    const line = scene.userData.line = new THREE.LineSegments(
        geometry_line,
        new THREE.LineBasicMaterial({ linewidth: 8}));
    const s = 1.025;
    line.scale.set(s, s, s);
    mesh.add(line);
};
// update method for the video
VIDEO.update = function(sm, scene, camera, per, bias){
    // mesh
    let mesh = scene.userData.mesh;
    mesh.rotation.y = Math.PI * 2 * per;
};

