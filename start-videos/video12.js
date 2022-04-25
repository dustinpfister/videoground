/*     video12 - Custom Geometry and Textures - For this video I am picking
 *       up from video11 this time I will be adding some textures.
 *       
 */
VIDEO.scripts = [
  './js/helper-vertex-normals.js',
  './js/canvas.js'
];
VIDEO.init = function(sm, scene, camera){

    // CAMERA
    camera.position.set(4, 4, 4);
    camera.lookAt(0, 0, 0);

    // GRID HELPER
    scene.add(new THREE.GridHelper(8, 8));

    // GEOMETRY
    var geometry =  scene.userData.geo = new THREE.BufferGeometry();
    // create a simple shape
    var vertices = new Float32Array( [
	-1.0, -1.0,  1.0,
	 1.0, -1.0,  -1.0,
	 1.0,  1.0,  1.0,

	-1.0, -1.0,  1.0,
	 1.0,  1.0,  1.0,
	-1.0,  1.0,  -1.0,

	 -1.0,  -1.0,  1.0,
	 -1.0, 1.0,  -1.0,
	 1.0,  -1.0,  -1.0,
    ]);
    // helper sphere
    var sphere = new THREE.Mesh(new THREE.SphereGeometry(0.05,20, 20));
    sphere.position.set(-1, -1, 1);
    // must have at least a position attribute, there are 3 values per vertex
    geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
    // this will create a normals attribute at least seems to work okay most of the time
    geometry.computeVertexNormals();
    // ADDING GROUPS TO GEO
    geometry.addGroup(0, 3, 0);
    geometry.addGroup(3, 3, 0);
    geometry.addGroup(6, 3, 0);
    geometry.addGroup(0, 3, 1);
    geometry.addGroup(3, 3, 1);
    geometry.addGroup(6, 3, 1);
    // ADDING UV ATTRIBUTE
    var uv = new Float32Array( [
	 0.0, 1.0,
	 1.0, 0.0,
	 1.0, 1.0,

	 0.0, 1.0,
	 1.0, 0.0,
	 1.0, 1.0,

	 0.0, 1.0,
	 1.0, 0.0,
	 1.0, 1.0
    ]);
   geometry.setAttribute( 'uv', new THREE.BufferAttribute( uv, 2 ) );
    
    // LIGHT
    var light = new THREE.DirectionalLight(0xffffff);
    light.position.set(1, 1, 0);
    scene.add(light);
    scene.add( new THREE.AmbientLight(0xffffff, 0.2) );

    // MATERIALS - using an array of them now
    var canvasObj = CanvasMod.createCanvasObject({});
    canvasObj.draw({drawMethod:'randomGrid', gRange:[0,0], rRange:[128, 200]})
    var material = [
        new THREE.MeshStandardMaterial({
            map: canvasObj.texture,
            side: THREE.FrontSide
        }),
        new THREE.MeshStandardMaterial({
            color: 0x2a2a2a, 
            side: THREE.BackSide
        }),
    ];

    // MESH
    var mesh = scene.userData.mesh = new THREE.Mesh(
        geometry,
        material);
    mesh.position.set(0, 0, 0);

    // VERTEX HELPER
    var helper = new THREE.VertexNormalsHelper( mesh, 2, 0x00ff00, 1 );
    mesh.userData.vertexNormalsHelper = helper;
    scene.add(helper);

    // ADD MESH AND HELPER SPHERE
    scene.add(mesh);
    mesh.add(sphere);

    // uv
    //console.log(geometry.getAttribute('position'));
    //console.log(geometry.getAttribute('normal'));
    //console.log(geometry.getAttribute('uv'));

};
VIDEO.update = function(sm, scene, camera, per, bias){

    var mesh = scene.userData.mesh,
    geo = scene.userData.geo;

    // rotate mesh
    mesh.rotation.y = Math.PI / 180 * 460 * sm.bias;

    // UPDATE POSITION OVER TIME
    var pos = geo.attributes.position;
    // mutation of one point
    var x = 1 - 10 * sm.bias,
    y = 0 + 0 * sm.bias,
    z = 2 - 1 * sm.bias;
    [0, 3, 6].forEach(function(index){
         pos.array[index * 3 + 0] = x;
         pos.array[index * 3 + 1] = y;
         pos.array[index * 3 + 2] = z;
    });
    // must do this!
    pos.needsUpdate = true;
    // bounding box and sphere
    geo.computeBoundingBox();
    geo.computeBoundingSphere();
    // update vertex normals and helper
    geo.computeVertexNormals();
    var helper = mesh.userData.vertexNormalsHelper;
    helper.update();

};

