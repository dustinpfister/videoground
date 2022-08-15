/*     video16 - promise returned by VIDEO.init
 *     
 *       
 */
VIDEO.init = function(sm, scene, camera){
    // BACKGROUND
    scene.background = new THREE.Color(0, 0.5, 0.5);
    // LIGHT
    var dl = new THREE.DirectionalLight(0xffffff, 1);
    dl.position.set(3, 2, 1);
    scene.add(dl);
    // returning a promise that must resolve or reject to continue
    return new Promise(function(resolve, reject){
        const loader = new THREE.BufferGeometryLoader();
        // load a resource
        loader.load(
            // resource URL
             //'json/foo.json',
             videoAPI.pathJoin(sm.filePath, 'json/box_house1_solid.json'),
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
        console.log(videoAPI);
    }).then(function(geometry){
        console.log('we should have geo');
        console.log(geometry);
        // createing a mesh with it
        var mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial());
        mesh.geometry.rotateX(Math.PI * 1.5);
        mesh.geometry.rotateY(Math.PI * 1.0);
        scene.add(mesh);
    });
};
VIDEO.update = function(sm, scene, camera, per, bias){
    camera.position.set(15 - 30 * per, 0, 15);
    camera.lookAt(0, 0, 0);
};
