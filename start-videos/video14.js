/*     video14 - Replace renderer
 *      testing out replace renderer feature added in r4
 *       
 */
VIDEO.init = function(sm, scene, camera){
    // GRID HELPER
    //scene.add( new THREE.GridHelper(8, 8) );

    // LIGHT
    var dl = new THREE.DirectionalLight(0xffffff, 0.2);
    dl.position.set(1,1,-1);
    scene.add(dl);
    var sl = new THREE.SpotLight(0xffffff, 0.8);
    sl.castShadow = true;
    sl.shadow.mapSize.width = 64;
    sl.shadow.mapSize.height = 64;
    sl.shadow.camera.near = 1;
    sl.shadow.camera.far = 1000;
    sl.position.set(1, 1,-1);
    scene.add(sl);


    // CUSTOM RENDERER
    var renderer = new THREE.WebGL1Renderer();
    renderer.shadowMap.enabled = true; // shadow map enabled
    sm.replaceRenderer(renderer);      // replace

    // PLANE MESH
    var plane = new THREE.Mesh(
        new THREE.PlaneGeometry(8, 8, 10, 10),
        new THREE.MeshStandardMaterial()
    );
    plane.geometry.rotateX(Math.PI * 1.5);
    plane.receiveShadow = true;
    scene.add(plane);

    // CUBE MESH
    var cube = new THREE.Mesh(
        new THREE.BoxGeometry(2, 2, 2),
        new THREE.MeshStandardMaterial({color: 0xff0000})
    );
    cube.castShadow = true;
    cube.position.set(0, 1, 0);
    scene.add(cube);


};
VIDEO.update = function(sm, scene, camera, per, bias){
    camera.position.set(5 - 10 * bias, 5, 5);
    camera.lookAt(0, 0, 0);
};
