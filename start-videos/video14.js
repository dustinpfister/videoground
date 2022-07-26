/*     video14 - Replace renderer
 *      testing out replace renderer feature added in r4
 *       
 */
VIDEO.init = function(sm, scene, camera){
    // GRID HELPER
    scene.add( new THREE.GridHelper(8, 8) );

    // CUSTOM RENDERER
    var renderer = new THREE.WebGLRenderer();

    // shadowMap
    renderer.shadowMap.enabled = true;

    sm.replaceRenderer(renderer);

};
VIDEO.update = function(sm, scene, camera, per, bias){
    camera.position.set(5 - 10 * bias, 5 - 5 * bias, 5);
    camera.lookAt(0, 0, 0);
};
