/*    video6.js - Testing out my scripts feature
 *      
 *      
 */
// using guy.js
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
    scene.background = new THREE.Color('#008f8f');
    // ---------- ----------
    // MESH OBJECTS
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
    // GRASS
    var grass_canvasObj = CanvasMod.createCanvasObject(sm);
    grass_canvasObj.draw({drawClass: 'def', drawMethod: 'randomGrid'});

    var grass = new THREE.Mesh(
        new THREE.BoxGeometry(55, 1, 55),
        new THREE.MeshStandardMaterial({
            //color: new THREE.Color('#008800')
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
   guy1.walk(sm.per, 16);
   guy1.moveHead(0.8 + 0.05 * sm.bias);
   guy1.group.position.set(-8 + 16 * sm.per, 4, 0);
   guy1.group.rotation.y = 1.57;


   camera.position.set(10 - 25 * sm.per, 8, 10);
   camera.lookAt(guy1.group.position);
};

