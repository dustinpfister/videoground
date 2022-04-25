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
        vm.$data.filePath = videoAPI.pathDirname(filePath);
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
                    total = VIDEO.scripts.length,
                    scriptDiv = document.getElementById('wrap_video_scripts');
                    // remove all child nodes of scriptDiv
                    utils.removeAllChildNodes(scriptDiv);
                    // for each relative URL
                    VIDEO.scripts.forEach( (scriptRelURL, i) => {
                        var url = videoAPI.pathJoin(vm.$data.filePath, scriptRelURL);
                        var script = document.createElement('script');
                        script.addEventListener('load', (e) => {
                            loaded += 1;
                            // run setip when all scripts are loaded
                            if(loaded === total){
                                sm.setup();
                            }
                        });
                        script.src = url;
                        scriptDiv.appendChild(script);
                    });
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
    // LOAD STARTING VIDEO FILE
    // ********** **********
    var startFilePath = videoAPI.pathJoin( videoAPI.dir_root, 'start-videos/video9.js' );
    videoAPI.loadFile(startFilePath, (text, e, filePath) => {
        setFilePath(filePath);
        if(e){
            console.warn(e.message);
        }else{
            loadText(text);
        }
    });
    // ********** **********
    // LOAD VIDEO FILE FROM MENU
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
}
    ());