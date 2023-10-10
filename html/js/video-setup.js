//   video-setup.js - Create the VIDEO object that is the start of the actual video js file to play
//       
//---------- ----------
// VIDEO object
//---------- ----------
// create main VIDEO OBJECT
let VIDEO = {};

/*
// remode
VIDEO.resmode = 5;
// init method for the video
VIDEO.init = function(sm, scene, camera){
    //return Promise.resolve();
};
// default render method
VIDEO.render = function(sm, canvas, ctx, scene, camera, renderer){
   ctx.clearRect(0,0, canvas.width, canvas.height);
   sm.renderer.render(sm.scene, sm.camera);
   ctx.drawImage(sm.renderer.domElement, 0, 0, sm.canvas.width, sm.canvas.height);
};
// update method for the video
VIDEO.update = function(sm, scene, camera, secs, per, bias){
};
*/
//---------- ----------
// SM OBJECT - used by ui-playback.js and ui-video-code.js
//---------- ----------
(function (sm) {

    // set defaults for VIDEO, to be called before sm.setup ( see ui-video-code.js ) 
    sm.setDefaults = () => {
        VIDEO.thum_frame = -1; // -1, undefined, or false for half way
        VIDEO.thum_overlay = (sm, canvas, ctx) => {
            ctx.fillStyle = 'white';
            ctx.font = '50px arial';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';
            ctx.fillText(sm.fileName, 10, 10);
        };
        VIDEO.resmode = 5;
        VIDEO.daePaths = null;
        VIDEO.daeResults = [];
        VIDEO.scripts = undefined;
        VIDEO.init = function(sm, scene, camera){};
        VIDEO.update = function(sm, scene, camera, secs, per, bias){};
        VIDEO.render = function(sm, canvas, ctx, scene, camera, renderer){
            ctx.clearRect(0,0, canvas.width, canvas.height);
            sm.renderer.render(sm.scene, sm.camera);
            ctx.drawImage(sm.renderer.domElement, 0, 0, sm.canvas.width, sm.canvas.height);
        };
    };
    sm.setDefaults();

    //-------- ----------
    // HARD CODED SETTINGS
    //-------- ----------
    const WRAP_CANVAS = document.querySelector('#wrap_canvas');
    const canvas_2d = document.createElement('canvas');
    canvas_2d.style.display = 'block';
    const ctx_2d = canvas_2d.getContext('2d');
    WRAP_CANVAS.appendChild( canvas_2d );
    // Sticking with 'youtube friendly' options when it comes to resolution
    // https://support.google.com/youtube/answer/6375112?hl=en&co=GENIE.Platform%3DDesktop
    const RESOLUTIONS = [
        {w: 256,  h: 144,  desc: '144p' },
        {w: 426,  h: 240,  desc: '240p' },
        {w: 640,  h: 360,  desc: '360p' },
        {w: 480,  h: 480,  desc: '480 1:1' },
        {w: 854,  h: 480,  desc: '480p' },
        {w: 1280, h: 720,  desc: 'HD 720p' },
        {w: 720,  h: 1280, desc: 'HD 720p ( yt short )' },
        {w: 1920, h: 1080, desc: 'HD 1080p' },
        {w: 1080, h: 1920, desc: 'HD 1080p ( yt short )' },
        {w: 3840, h: 2160, desc: '4k' },
        {w: 7680, h: 4320, desc: '8k' }
    ];
    //const DEFAULT_RESOLUTION = 5; // going with 720p as a default for this
    const HARD_INIT_PROMISE = {data: 'default init promise object used'};
    const HARD_UPDATE_PROMISE = {data: 'default update promise object used'};
    //-------- ----------
    // HELPER FUNCTIONS
    //-------- ----------
    // get bias value helper
    const getBias = (per) => {
        return 1 - Math.abs(per - 0.5) / 0.5;
    };
    // get an object like {w: 1, h: 0.75} from an object like { w: 640, h: 480}
    const getRatio = (res) => {
       let m = Math.max(res.w, res.h);
       return {
           w : res.w / m,
           h : res.h / m
       };
    };
    //-------- ----------
    // THE STATE MACHINE (sm) object
    //-------- ----------
    Object.assign(sm, {
        isExport: false,
        fileName: 'untitled',
        res: RESOLUTIONS[VIDEO.resmode],
        res_current_index: VIDEO.resmode,
        res_options: RESOLUTIONS,
        filePath: null,
        canvas: canvas_2d,
        ctx: ctx_2d,
        frame: 0,
        frameFrac: 0,
        frameMax: 300,
        render_frame_start: 0, // start and end render frames
        render_frame_end: 300,
        per: 0,
        bias: 0,
        scene: new THREE.Scene(),
        camera: null,
        renderer: null,
        loopActive: false,
        secs: 0,
        lt: new Date(),
        fps_update: 30,       // fps rate to update ( low fps for low CPU use, but choppy playback video )
        fps_movement: 30,
        previewSize: 600
    });
    // app loop
    const loop = function () {
        const now = new Date();
        sm.secs = (now - sm.lt) / 1000;
        if(sm.loopActive){
            //!!! R9 CHANGE - No Longer Have a single call of requeat animaiton frame here
            if(sm.secs > 1 / sm.fps_update){
                //!!! R9 CHANGE - updated loop so that sm.frame, and sm.lt will only update when promise will resolve
                sm.setFrame()
                .then(()=>{
                    requestAnimationFrame(loop);
                    sm.frameFrac += sm.fps_movement * sm.secs;
                    sm.frameFrac %= sm.frameMax;
                    sm.frame = Math.floor(sm.frameFrac)
                    sm.lt = now;
                });
            }
            if(sm.secs < 1 / sm.fps_update){
                requestAnimationFrame(loop);
            }
        }
    };

    // setup is to be called after text of video file has been applyed ( see ui-video-code.js ) 
    sm.setup = function(){
        sm.isExport = false;
        sm.frame = 0;
        sm.frameFrac = 0;
        sm.loopActive = false;
        // create new scene object on setup
        sm.scene = new THREE.Scene();
        // sm.camera created on each call of sm.setup
        sm.camera = new THREE.PerspectiveCamera(40, sm.res.w / sm.res.h, 0.1, 1000);
        sm.camera.position.set(10, 10, 10);
        sm.camera.lookAt(0, 0, 0);
        // code to check if VIDEO.init returns a promise or not
        //!!! R9 CHANGE - made it so that sm.setup will return a promise when called
        return (VIDEO.init(sm, sm.scene, sm.camera) || Promise.resolve(HARD_INIT_PROMISE) )
        .then((obj) => {
            if(obj === HARD_INIT_PROMISE){
                console.log('sm.setup: no promise used');
            }else{
                console.log('sm.setup: looks like VIDEO.init returned a promsie:');
                console.log(obj);
            }
            sm.render_frame_start = 0;
            sm.render_frame_end = sm.frameMax;
            // R10 - default thum frame
            if(VIDEO.thum_frame === -1 || VIDEO.thum_frame === false || VIDEO.thum_frame === undefined ){
                VIDEO.thum_frame = Math.floor(sm.frameMax / 2);
            }
            // setup
            sm.setFrame();
        });
    };
    // set frame
    sm.setFrame = function(){
        sm.per = Math.round(sm.frame) / sm.frameMax;
        sm.bias = getBias(sm.per);
        // call VIDEO.update, then VIDEO.render

        //VIDEO.update(sm, sm.scene, sm.camera, sm.per, sm.bias);
        //VIDEO.render(sm, sm.canvas, sm.ctx, sm.scene, sm.camera, sm.renderer);

        //!!! R9 CHNAGE - updated this method to allow for the use of Promise Objects to be returned in VIDEO.update methods
        return (VIDEO.update(sm, sm.scene, sm.camera, sm.per, sm.bias) || Promise.resolve(HARD_UPDATE_PROMISE) )
        .then((obj) => {
            VIDEO.render(sm, sm.canvas, sm.ctx, sm.scene, sm.camera, sm.renderer);
        });

    };
    // start loop
    sm.play = function(){
        sm.loopActive = !sm.loopActive;
        if(sm.loopActive){
            sm.lt = new Date();
            loop();
        }
    };
    // set the resolution of the renderer, update the camera also
    sm.resSet = function(new_index){
        sm.res_current_index = new_index === undefined ? sm.res_current_index : new_index;
        sm.res = sm.res_options[sm.res_current_index];
        // set size of the renderer canvas
        sm.renderer.setSize(sm.res.w, sm.res.h, false);
        // set scaled size of canvas
        let ratio = getRatio(sm.res);
        sm.canvas.width = sm.res.w;
        sm.canvas.height = sm.res.h;
        sm.canvas.style.width = Math.floor(ratio.w * sm.previewSize) + 'px';
        sm.canvas.style.height = Math.floor(ratio.h * sm.previewSize) + 'px';
        // update camera aspect ratio
        if(sm.camera){
            sm.camera.aspect = sm.res.w / sm.res.h;
            sm.camera.updateProjectionMatrix();
        }
    },
    // replace renderer method
    sm.replaceRenderer = function(newRenderer){
        sm.renderer = newRenderer;
        sm.resSet(sm.res_current_index);
    };
    // call replace renderer for first time here before calling sm.setup
    sm.replaceRenderer( new THREE.WebGL1Renderer() );
    sm.setDefaults();
    sm.setup();
    //-------- ----------
    // MENU EVENTS
    //-------- ----------
    videoAPI.on('menuAbout', function(evnt){});
}
    ( this['sm'] = {} ));