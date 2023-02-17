/*     video4 - Another point light example
 *       
 *       
 */
// init method for the video
VIDEO.init = function(sm, scene, camera){
    // static camera
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 0, 0);
    // GRID HELPER
    scene.add(new THREE.GridHelper(8, 4));
    // LIGHT
    let light = scene.userData.light = new THREE.Mesh(
        new THREE.SphereGeometry(0.25, 20, 20),
        new THREE.MeshStandardMaterial({
            emissive: 0xffffff
        }));
    light.add(new THREE.PointLight());
    light.position.set(0, 0, 0);

    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.1))

    // GROUP
    let group = scene.userData.group = new THREE.Group();
    scene.add(group);

    // ADD MESH OBJECTS TO GROUP
    let i = 0, len = 10, x, y = 0, z, radian,
    colors = ['red', 'lime', 'blue']
    while(i < len){
        let mesh = new THREE.Mesh(
            new THREE.SphereGeometry(1, 30, 30),
            new THREE.MeshStandardMaterial({
                color: new THREE.Color(colors[i % colors.length])
            }));
        radian = Math.PI * 2 / len * i;
        x = Math.cos(radian) * 4;
 
        z = Math.sin(radian) * 4;
        mesh.position.set(x, y, z);
        group.add(mesh);
        i += 1;
    }
};

// update method for the video
VIDEO.update = function(sm, scene, camera, per, bias){
    // update mesh
    let group = scene.userData.group,
    len = group.children.length;
    group.rotation.y = Math.PI * 4 * sm.per;
    group.children.forEach((mesh, i) => {
        let per = sm.bias + 1 / len * i % 1;
        mesh.position.y = -5 + 5 * per;
    });
};

