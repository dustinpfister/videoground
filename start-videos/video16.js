/*     video16 - promise returned by VIDEO.init
 *     
 *       
 */


VIDEO.init = function(sm, scene, camera){
    // GRID HELPER
    scene.add( new THREE.GridHelper(8, 8) );
    return Promise.resolve({data: 'okay this is good'}).then(function(obj){

        return obj;

    })
};

VIDEO.update = function(sm, scene, camera, per, bias){
};
