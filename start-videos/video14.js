/*     video14 - Replace renderer
 *      testing out replace renderer feature added in r4
 *       
 */
VIDEO.init = function(sm, scene, camera){
    // GRID HELPER
    scene.add( new THREE.GridHelper(8, 8) );

    // CUSTOM RENDERER
    var renderer = new THREE.WebGL1Renderer();
    renderer.shadowMap.enabled = true; // shadow map enabled
    sm.replaceRenderer(renderer);      // replace


};
VIDEO.update = function(sm, scene, camera, per, bias){
    camera.position.set(5 - 10 * bias, 5 - 5 * bias, 5);
    camera.lookAt(0, 0, 0);
};
