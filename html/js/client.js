(function () {

    // ********** **********
    // HARD CODED SETTINGS
    // ********** **********

    const WRAP_CANVAS = document.querySelector('#wrap_canvas');

    // Sticking with 'youtube friendly' options when it comes to resolution
    // https://support.google.com/youtube/answer/6375112?hl=en&co=GENIE.Platform%3DDesktop
    const RESOLUTIONS = [
        {w: 426, h: 240},
        {w: 640, h: 360},
        {w: 854, h: 480},
        {w: 1280, h: 720},
        {w: 1920, h: 1080}
    ];
    const DEFAULT_RESOLUTION = 2; // going with 480p as a default for this

    // ********** **********
    // HELPER FUNCTIONS
    // ********** **********

    // get bias value helper
    let getBias = (per) => {
        return 1 - Math.abs(per - 0.5) / 0.5;
    };

    // get an object like {w: 1, h: 0.75} from an object like { w: 640, h: 480}
    let getRatio = (res) => {
       let m = Math.max(res.w, res.h);
       return {
           w : res.w / m,
           h : res.h / m
       };
    };

    // ********** **********
    // SCENE, CAMERA, and RENDERER
    // ********** **********
    let res = RESOLUTIONS[DEFAULT_RESOLUTION];
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(40, res.w / res.h, 0.1, 1000);
    camera.position.set(10, 10, 10);
    camera.lookAt(0, 0, 0);
    let renderer = new THREE.WebGLRenderer(),
    canvas = renderer.domElement;
    // append to wrap canvas
    WRAP_CANVAS.appendChild(canvas);
    renderer.setSize(res.w, res.h);

    // set scaled size of canvas
    let ratio = getRatio(res);
    canvas.style.width = Math.floor(ratio.w * 420) + 'px';
    canvas.style.height = Math.floor(ratio.h * 420) + 'px';

    // ********** **********
    // THE STATE MACHINE (sm) object
    // ********** **********
    let sm = window.sm = {
        canvas: canvas,
        frame: 0,
        frameFrac: 0,
        frameMax: 600,
        per: 0,
        bias: 0,
        scene: scene,
        camera: camera,
        loopActive: false
    };
    let secs = 0,
    fps_update = 30,   // fps rate to update ( low fps for low CPU use, but choppy video )
    fps_movement = 60, // fps rate to move camera
    frame = 0,
    frameMax = 600,
    loopActive = false,
    lt = new Date();
    // update
    let update = function(){
        sm.per = Math.round(sm.frame) / sm.frameMax;
        sm.bias = getBias(sm.per);
        VIDEO.update(sm, scene, camera, sm.per, sm.bias);
    };
    // app loop
    let loop = function () {
        let now = new Date(),
        secs = (now - lt) / 1000;
        if(sm.loopActive){
            requestAnimationFrame(loop);
            if(secs > 1 / fps_update){

                sm.setFrame();

                sm.frameFrac += fps_movement * secs;
                sm.frameFrac %= sm.frameMax;
                sm.frame = Math.floor(sm.frameFrac)
                lt = now;
            }
        }
    };
    // setup
    sm.setup = function(){
        sm.frame = 0;
        sm.frameFrac = 0;
        sm.loopActive = false;
        scene.children = [];
        scene.background = new THREE.Color('black');
        VIDEO.init(sm, scene, camera);
        sm.setFrame();
    };
    // set frame
    sm.setFrame = function(){
        // call update method
        update(secs);
        // render
        renderer.render(scene, camera);
    };
    // start loop
    sm.play = function(){
        sm.loopActive = !sm.loopActive;
        if(sm.loopActive){
            lt = new Date();
            loop();
        }
    };

    sm.setup();

}
    ());