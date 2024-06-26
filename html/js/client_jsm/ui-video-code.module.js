// ui-video-code.js - For the user interface that is used to edit and run the javaScript code for the video
import * as THREE from 'three';
(function () {
    //-------- ----------
    // HELPER METHODS
    //-------- ----------
    // log method for ui-video-code
    const log =  (mess) => {
        videoAPI.log(mess, 'ui-video-code.js');
    };
    
    const removeAllChildNodes = function(fromNode){
        while (fromNode.firstChild) {
            fromNode.removeChild(fromNode.lastChild);
        }
    };
    
    var convertEOL = (text, EOL_text) => {
        EOL_text = EOL_text || '\r\n';
        return text.replace(/\r\n|\r|\n/g, EOL_text);
    };
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
    // code for updating the title
    const updateTitle = (vm) => {
        let ast = vm.$data.unsaved_changes ? '* ' : '';
        document.title = ast + 'VideoGround - ' + vm.$data.fileName;
    };
    // set filePath helper
    var setFilePath = (vm, filePath) => {
    
    
        console.log('yes');
    
        sm.filePath = vm.$data.filePath = videoAPI.pathDirname(filePath);
        
        
        
        vm.$data.fileName = videoAPI.pathBasename(filePath);
        
        
        
        //sm.fileName = fileName = vm.$data.fileName;
        
        
        sm.fileName = vm.$data.fileName;
        
        console.log('yes');
        
        // update title
        //document.title = 'VideoGround - ' + vm.$data.fileName;
        updateTitle(vm);
    };
    // load text
    var loadText = (vm, text) => {
        try{
        
        log('yes we get here just fine');
        
            // set defaults
            sm.setDefaults();
            // !!! - #1 - USING EVAL FOR NOW UNTIL I FIGURE OUT SOMTHING BETTER
            eval(text);
            // set last and current videoJS
            vm.$data.videoJS = text;
            // load any and all dae files first
            //loadDAE( () => {

if(VIDEO.resmode){
    sm.resSet( parseInt(VIDEO.resmode) );
}

                // load scripts
                if(VIDEO.scripts){
                    var loaded = 0,
                    loadingFile = false,
                    total = VIDEO.scripts.length,
                    scriptDiv = document.getElementById('wrap_video_scripts');
                    // remove all child nodes of scriptDiv
                    removeAllChildNodes(scriptDiv);
                    // loading scripts in order in which they are given
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
                            log('loading done!');
                            sm.setup();
                        }
                    };
                    loadLoop();
                }else{
                    // no scripts? then just run setup
                    sm.setup();
                }
           // });
        }catch(e){
            console.warn(e.message);
        }
    };
    //-------- ----------
    // VUE FOR VIDEO CODE USER INTERFACE
    //-------- ----------
    // vm instance for video code input text area
    const vm = new Vue({
        el: '#wrap_video_code',
        template: '<div class="wrap_ui wrap_ui_video_code">' +
            '<span>Video Code Controls:</span><br>' +
            '<span>fileName: {{ fileName }}</span><br>' +
            '<span> unsaved changes: {{ unsaved_changes }}</span><br>' +
            '<button name="run" v-on:click="updateVideo">Run</button><br>'+
            '<textarea class="textarea_js" v-model="videoJS" v-on:input="textChange"></textarea>'+
        '</div>',
        data: {
           sm: sm,
           unsaved_changes: false,
           fileName: null,
           filePath: null, 
           EOL_text: '\r\n',
           videoJS_last: '',   // only updates on save, and load events
           videoJS: ''
        },
        methods: {
            textChange : () => {
                vm.$data.videoJS = convertEOL(vm.$data.videoJS, vm.$data.EOL_text);
                vm.$data.unsaved_changes = !(vm.$data.videoJS === vm.$data.videoJS_last);
                updateTitle(vm);
            },
            updateVideo : function(e){
                loadText(vm, vm.$data.videoJS);
            }
        }
    });
    //-------- ----------
    // MENU EVENTS
    //-------- ----------
    videoAPI.on('menuOpenFile', function(text, e, filePath){
        log('Menu open event handler in ui-video-code.js');
        setFilePath(vm, filePath);
        vm.$data.videoJS_last = vm.$data.videoJS = convertEOL(text, vm.$data.EOL_text);
        vm.$data.unsaved_changes = false;
        updateTitle(vm);
        loadText(vm, text);
    });
    // save the current file
    videoAPI.on('menuSaveFile', () => {
        const uri_file = videoAPI.pathJoin(vm.$data.filePath, vm.$data.fileName);
        log('Save file event started for ' + uri_file);
        // convert EOL
        vm.$data.videoJS_last = vm.$data.videoJS = convertEOL(vm.$data.videoJS, vm.$data.EOL_text);
        vm.$data.unsaved_changes = false;
        updateTitle(vm);
        // save
        videoAPI.writeJSFile(uri_file, vm.$data.videoJS)
        .then(()=>{
           log('Saved the current file: ' + vm.$data.fileName);
        })
        .catch((e)=>{
            console.warn(e.message);
        });
    });
    // save a file as
    videoAPI.on('menuSaveAsFile', function(evnt, result){
        if(!result.canceled){
            // convert EOL
            vm.$data.videoJS_last = vm.$data.videoJS = convertEOL(vm.$data.videoJS, vm.$data.EOL_text);
            vm.$data.unsaved_changes = false;
            updateTitle(vm);
            // save
            videoAPI.writeJSFile(result.filePath, vm.$data.videoJS)
            .then(()=>{
                log('Saved a new file as: ' + result.filePath);
                setFilePath(vm, result.filePath);
            })
            .catch((e)=>{
                console.warn(e.message);
            });
        }
    });
    // on menu error
    videoAPI.on('menuError', function(evnt, err){
        log(err);
    });
    //videoAPI.on('menuAbout', function(evnt){});
    //-------- ----------
    // LOAD STARTING VIDEO FILE
    //-------- ----------
    //!!! R7 Change - loading settings object, and use the start video uri there
    // only use the hard coded start video if there is an error
    videoAPI.getSettings()
    .then((obj_settings)=>{
        log('Was able to get the settings object just fine.');
        return videoAPI.loadFile( obj_settings.uri_video_start )
    })
    .catch((e)=>{
        log('There was an error getting the settings object.');
        log(e.message);
        log('loading the hard coded start video then...');
        return videoAPI.loadFile( videoAPI.uri_startvideo )
    })
    .then((result)=>{
        log('got a result just fine for the start file to load.');
        setFilePath(vm, result.filePath);
        
        
        
        loadText(vm, result.text);
        vm.$data.videoJS_last = result.text;
    })
    .catch((e)=>{
        log('error loading text when trying to load the start file.');
        log(e.message);
    });
}
    ());
