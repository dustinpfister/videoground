/*     video16 - promise returned by VIDEO.init
 *     
 *       
 */


VIDEO.init = function(sm, scene, camera){
    // GRID HELPER
    scene.add( new THREE.GridHelper(8, 8) );
    return new Promise(function(resolve, reject){
        const loader = new THREE.BufferGeometryLoader();

        // load a resource
        loader.load(
            // resource URL
             //'json/foo.json',
             videoAPI.pathJoin(sm.filePath, 'json/foo.json'),

             // onLoad callback
             function ( geometry ) {
                  resolve(geometry);
             },
             // onProgress callback
             function ( xhr ) {
                 console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
             },
             // onError callback
             function ( err ) {
                 reject(err)
             }
        );
    }).catch(function(err){
        console.log(err.message); // failed to fetch message
console.log(videoAPI)
    });
};

VIDEO.update = function(sm, scene, camera, per, bias){
};
