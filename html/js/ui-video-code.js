(function () {
    // template and vm instance for video code ui
    var vm = new Vue({
        el: '#wrap_video_code',
        template: '<div class="wrap_ui">' +
            '<span>{{ fileName }}</span><br><br>' +
            //'<span>{{ filePath }}</span><br>' +
            '<textarea v-model="videoJS" cols="60" rows="10" v-on:input="updateVideo"></textarea>'+
        '</div>',
        data: {
           sm: sm,
           fileName: null,
           filePath: null, // the current path for the video.js file
           videoJS: '\/\/ Video JavaScript goes here'
        },
        methods: {
            updateVideo : function(e){
                loadText(e.target.value);
            }
        }
    });
    // load dae
    var loadDAE = function(callback){
        // if there are dea paths then I will want to load them	
        if(VIDEO.daePaths){
            var manager = new THREE.LoadingManager(function (result) {
                callback();
            });
            var loader = new THREE.ColladaLoader(manager);
            VIDEO.daePaths.forEach(function(daeRelUrl){
                var url = videoAPI.pathJoin(vm.$data.filePath, daeRelUrl);
                // USING setResourcePath seems to have fixed bug #3 in windows
                loader.setResourcePath( videoAPI.pathDirname( url )  + '/' );
                    loader.load(url, function (result) {
                        VIDEO.daeResults.push(result);
                    });
            });
        }else{
           // just call setup if there are no *.dae files	
           callback();
        }
    };
    // set filePath helper
    var setFilePath = (filePath) => {
        //!!! r5 change - added a sm.filePath
        sm.filePath = vm.$data.filePath = videoAPI.pathDirname(filePath);
        vm.$data.fileName = videoAPI.pathBasename(filePath);
        document.title = 'VideoGround - ' + vm.$data.fileName;    
    };
    // load text
    var loadText = (text) => {
        try{
            // by default no dae files are used
            VIDEO.daePaths = null;
            VIDEO.daeResults = [];
            VIDEO.scripts = undefined;
            // !!! - #1 - USING EVAL FOR NOW UNTIL I FIGURE OUT SOMTHING BETTER
            eval(text);
            vm.$data.videoJS = text;
            // load any and all dae files first
            loadDAE( () => {
                // load scripts
                if(VIDEO.scripts){
                    var loaded = 0,
                    loadingFile = false,
                    total = VIDEO.scripts.length,
                    scriptDiv = document.getElementById('wrap_video_scripts');
                    // remove all child nodes of scriptDiv
                    utils.removeAllChildNodes(scriptDiv);
                    //!!! - r5 changed - loading scripts in order in which they are given
                    var loadLoop = function(){
                        if(loaded != total){
                            setTimeout(loadLoop, 30);
                            // not loading a file? then start loading the next one
                            if(!loadingFile){
                                var scriptRelURL = VIDEO.scripts[loaded];
                                var url = videoAPI.pathJoin(vm.$data.filePath, scriptRelURL);
                                var script = document.createElement('script');
                                loadingFile = true;
                                script.addEventListener('load', (e) => {
                                    loaded += 1;
                                    loadingFile = false;
                                });
                                scriptDiv.appendChild(script);
                                script.src = url;
                            }
                        }else{
                            // loading done
                            console.log('loading done!');
                            sm.setup();
                        }
                    };
                    loadLoop();
                }else{
                    // no scripts? then just run setup
                    sm.setup();
                }
            });
        }catch(e){
            console.warn(e.message);
        }
    };
    // ********** **********
    // MENU EVENTS
    // ********** **********
    videoAPI.on('menuOpenFile', function(text, e, filePath){
        console.log('Menu open event handler in ui-video-code.js');
        setFilePath(filePath);
        loadText(text);
    });
    // on save file
    videoAPI.on('menuSaveFile', function(evnt, result){
        if(!result.canceled){
            videoAPI.writeJSFile(result.filePath, vm.$data.videoJS, (e) => {
                if(e){
                    console.warn(e.message);
                }else{
                    console.log('wrote file: ' + result.filePath);
                }
            });
        }
    });
    // on menu error
    videoAPI.on('menuError', function(evnt, err){
        console.log(err);
    });

    // ********** **********
    // LOAD STARTING VIDEO FILE
    // ********** **********

    //!!! - r4 change - making use of videoAPI.uri_startvideo defined in preload.js
    //!!! - r5 change - using promise returned by videoAPI.loadFile
    console.log('calling videoAPI.loadFile for first time for: ' + videoAPI.uri_startvideo);
    videoAPI.loadFile(videoAPI.uri_startvideo)
    .then((result)=>{
        console.log('videoAPI.loadFile: The then function called');
        setFilePath(result.filePath);
        loadText(result.text);
    })
    .catch((e)=>{
        console.log(' catch')
        console.warn(e.message);
    });
}
    ());