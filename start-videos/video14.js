/*     video14 - Replace renderer
 *      testing out replace renderer feature added in r4
 *       
 */
VIDEO.init = function(sm, scene, camera){
    // GRID HELPER
    //scene.add( new THREE.GridHelper(8, 8) );

    // LIGHT
    var dl = new THREE.DirectionalLight(0xffffff, 0.1);
    dl.position.set(1,1,-1);
    scene.add(dl);
    var sl = new THREE.SpotLight(0xffffff, 0.5);
    sl.position.set(1, 1,-1);
    scene.add(sl);


    // CUSTOM RENDERER
    var renderer = new THREE.WebGL1Renderer();
    renderer.shadowMap.enabled = true; // shadow map enabled
    sm.replaceRenderer(renderer);      // replace

    // PLANE MESH
    var plane = new THREE.Mesh(
        new THREE.PlaneGeometry(5, 5, 10, 10),
        new THREE.MeshStandardMaterial()
    );
    plane.geometry.rotateX(Math.PI * 1.5)
    scene.add(plane);


};
VIDEO.update = function(sm, scene, camera, per, bias){
    camera.position.set(5 - 10 * bias, 5 - 5 * bias, 5);
    camera.lookAt(0, 0, 0);
};
