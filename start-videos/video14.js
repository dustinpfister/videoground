/*     video14 - Replace renderer
 *     
 *       
 */
VIDEO.init = function(sm, scene, camera){
    // GRID HELPER
    scene.add( new THREE.GridHelper(8, 8) );

    // CUSTOM RENDERER
    var renderer = new THREE.WebGLRenderer()
    sm.replaceRenderer(renderer);

};
VIDEO.update = function(sm, scene, camera, per, bias){
    camera.position.set(5 - 10 * bias, 5 - 5 * bias, 5);
    camera.lookAt(0, 0, 0);
};
