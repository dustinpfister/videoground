/*     video13 - More than one camera
 *        demo for new r4 changes that allow for changing what camera is used
 *       
 */
VIDEO.init = function(sm, scene, camera){

    // can add to sm object

    var width = 854,
    height = 480;
    sm.cams = [
        new THREE.PerspectiveCamera(40, width / height, 0.1, 1000),
        new THREE.PerspectiveCamera(60, width / height, 0.1, 1000),
        new THREE.OrthographicCamera( -5, 5, 2, -2, 1, 1000 )
    ];

    //sm.camera = sm.cams[1];
    //sm.camera.position.set(5, 5, 5);
    //sm.camera.lookAt(0, 0, 0);

    // GRID HELPER
    scene.add( new THREE.GridHelper(8, 8) );
    

};
VIDEO.update = function(sm, scene, camera, per, bias){


    sm.camera = sm.cams[ Math.floor(sm.cams.length * per) ];

    sm.camera.position.set(5 - 10 * bias, 5 - 5 * bias, 5);
    sm.camera.lookAt(0, 0, 0);



};

