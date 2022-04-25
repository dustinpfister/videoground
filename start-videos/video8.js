/*    video8.js - playing with setFromSphericalCoords an raycaster to position an object on
 *      A mesh such as a sphere. This is the first step to a system that is used to positon
 *      an object 'from land' rather than from 'sea level'.
 */
// init method for the video
VIDEO.init = function(sm, scene, camera){

    // static camera
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 0, 0);
    // GRID HELPER
    //scene.add(new THREE.GridHelper(8, 8));

    // WORLD OBJECT
    let world = scene.userData.world = new THREE.Mesh(
        new THREE.SphereGeometry(3, 20, 20),
        new THREE.MeshNormalMaterial({
            wireframe: true
        }));
    world.userData.world = true;
    scene.add(world);

    // UNIT OBJECT
    let unit = scene.userData.unit = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
    unit.userData.world = false;
    scene.add(unit);

};

// update method for the video
VIDEO.update = function(sm, scene, camera, per, bias){

    let unit = scene.userData.unit,
    world = scene.userData.world;

    var toPhi = THREE.MathUtils.degToRad( 90 );
    var toTheta = THREE.MathUtils.degToRad( 250 - 250 * sm.bias );

    unit.position.setFromSphericalCoords(5, toPhi, toTheta );
    unit.lookAt(0,0,0);

    // origin
    let ori = unit.position.clone();

    // direction
    let dir2 = ori.clone().normalize().multiplyScalar(-1);

    // normalize dir
    dir2.normalize();

    // create and set raycaster
    let raycaster = new THREE.Raycaster();
    raycaster.set(ori, dir2);

    // result
    let result = raycaster.intersectObject( world );
    let resObj = result[0];
    if(resObj){
        unit.position.copy(resObj.point);
    }

};

