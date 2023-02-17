/*    video7.js - Making sure that scripts and dae files are working as they should be
 *      
 *      
 */

// one dae file of the box house
VIDEO.daePaths = [
  './dae/box-house/box_house1.dae'
];
// using guy scripts
VIDEO.scripts = [
  './js/canvas.js',
  './js/guy.js',
  './js/guy-canvas.js'
];
// init method for the video
VIDEO.init = function(sm, scene, camera){
    // ---------- ----------
    // SCENE
    // ---------- ----------
    //scene.background = new THREE.Color('#008f8f');
    var bg_canvasObj = CanvasMod.createCanvasObject(sm);
    bg_canvasObj.draw({drawMethod: 'randomGrid', gRange:[32,64], bRange:[128, 200]});
    scene.background = bg_canvasObj.texture;
    // ---------- ----------
    // GUY1 OBJECT
    // ---------- ----------
    // guy1 object with all mesh objects
    var guy1 = scene.userData.guy1 = new Guy();
    // guy1 canvas obj
    var guy1_canvasObj = scene.userData.guy1_canvasObj = CanvasMod.createCanvasObject(sm, GuyCanvasMethods);
    guy1.head.material[1] = guy1.head.material[1] = new THREE.MeshStandardMaterial({ 
        map:  guy1_canvasObj.texture
    });
    scene.add(guy1.group);
    // HAT for head of guy1 head
    var hat_canvasObj = CanvasMod.createCanvasObject(sm, GuyCanvasMethods);
    hat_canvasObj.draw({drawClass: 'hat', drawMethod: 'stripes'});
    var hatMaterial = new THREE.MeshStandardMaterial({
        map: hat_canvasObj.texture
    });
    var hat = new THREE.Mesh(
        new THREE.ConeGeometry(0.80, 1.5),
        hatMaterial
    );
    hat.rotation.x = THREE.MathUtils.degToRad(-30);
    hat.position.set(0, 0.83 ,-0.6)
    guy1.head.add(hat);
    // using hat texture for body and arms
    guy1.body.material = hatMaterial;
    guy1.arm_right.material = hatMaterial;
    guy1.arm_left.material = hatMaterial;
    // ---------- ----------
    // BOX HOUSE
    // ---------- ----------
    let obj = utils.DAE.getMesh( VIDEO.daeResults[0] );
    obj.scale.set(1.5, 1.5, 1.5);
    obj.position.set(-18, 11, -6);
    obj.rotation.x = Math.PI * 1.5;
    obj.rotation.z = -2.2;
    //var obj_canvasObj = CanvasMod.createCanvasObject(sm);
    //obj_canvasObj.draw({drawMethod: 'randomGrid', gridWidth: 10, gridHeight: 10,rRange:[0, 200], gRange:[0, 0]});
    obj.material = new THREE.MeshStandardMaterial({
        //map: obj_canvasObj.texture
        color: new THREE.Color('#ffaa00')
    });
    scene.add(obj);
    // ---------- ----------
    // GRASS
    // ---------- ----------
    var grass_canvasObj = CanvasMod.createCanvasObject(sm);
    grass_canvasObj.draw({
        drawClass: 'def', drawMethod: 'randomGrid',
        gridWidth: 25, gridHeight: 25,
        gRange: [100, 220], bRange: [32, 100]
    });
    var grass = new THREE.Mesh(
        new THREE.BoxGeometry(55, 1, 55),
        new THREE.MeshStandardMaterial({
            map: grass_canvasObj.texture
        })
    );
    scene.add(grass);
    // ---------- ----------
    // LIGHT
    // ---------- ----------
    var light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(100,100, 0)
    scene.add(light)
    scene.add( new THREE.AmbientLight(0xffffff, 0.1));
};
// update method for the video
VIDEO.update = function(sm, scene, camera, per, bias){
   var guy1 = scene.userData.guy1;
   var guy1_canvasObj = scene.userData.guy1_canvasObj;
   // update face
   var mPer = sm.per * 8 % 1,
   mBias = 1 - Math.abs(0.5 - mPer) / 0.5;
   // update face canvas
   guy1_canvasObj.draw({
       drawClass: 'face',
       drawMethod: 'talk',
       mouthPer: mBias,
       leftEyeXPer: mBias, rightEyeXPer: 1 - mBias
   });
   // move legs
   guy1.moveLegs(sm.per, 16);
   // move arms
   var swingPer = sm.per * 4 % 1,
   swingBias = 1 - Math.abs(0.5 - swingPer) / 0.5,
   swing = -0.25 + 0.25 * swingBias;
   guy1.moveArm('arm_left', swing, 0.75);
   guy1.moveArm('arm_right', swing, 0.75);
   // move head
   guy1.moveHead(0.9 + 0.2 * sm.bias);
   // over all position and heading of guy
   guy1.group.position.set(-8 + 16 * sm.per, 4, 10 * sm.bias);
   guy1.group.lookAt(100, 10 - 80 * sm.bias, 200 * sm.bias);

   var v = new THREE.Vector3();
   v.copy(guy1.group.position);
   v.x += 10;
   v.z += 5;
   camera.position.copy(v)
   camera.lookAt(guy1.group.position);
};

