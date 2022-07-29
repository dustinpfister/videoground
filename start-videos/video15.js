/*     video15 - Script load Test
 *      testing the order in which scrips load
 *       
 */
VIDEO.scripts = [
  'js/load-order/a.js',
  'js/load-order/b.js',
  'js/load-order/c.js',
  'js/load-order/d.js',
  'js/load-order/e.js',
  'js/load-order/f.js',
  'js/load-order/g.js',
  'js/load-order/h.js',
  'js/load-order/i.js'
];

VIDEO.init = function(sm, scene, camera){
    // GRID HELPER
    scene.add( new THREE.GridHelper(8, 8) );
};

VIDEO.update = function(sm, scene, camera, per, bias){
};
