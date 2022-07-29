// preload with contextIsolation enabled
const { contextBridge, ipcRenderer} = require('electron');
const path = require('path');
const fs = require('fs')

// the api that will be window.videoAPI in the client side code
let videoAPI = {};

videoAPI.dir_root = __dirname;
videoAPI.pathJoin = path.join;
videoAPI.pathBasename = path.basename;
videoAPI.pathDirname = path.dirname;

//!!! r4 change - videoAPI.uri_startvideo value
videoAPI.uri_startvideo = videoAPI.pathJoin( videoAPI.dir_root, 'start-videos/video15.js' );

// the events object
const EVENT = {};

// export to images
EVENT.menuExport = function(callback){
    ipcRenderer.on('menuExport', function(evnt, result, mode) {
        let imageFolder = result.filePaths[0];
        callback(evnt, result, imageFolder, mode);
    });
};

// when a file is opened with file > open
EVENT.menuOpenFile = function(callback){
    ipcRenderer.on('menuOpenFile', function(evnt, result) {
        let filePath = result.filePaths[0];
        videoAPI.loadFile(filePath, callback, evnt, result);
    });
};

EVENT.menuSaveFile = function(callback){
    ipcRenderer.on('menuSaveFile', callback);
};

// when an error happens with a menu option
EVENT.menuError = function(callback){
    ipcRenderer.on('menuError', function(evnt, err) {
        callback(evnt, err);
    });
};

// The main on method to attach events
videoAPI.on = function(eventType, callback){
   EVENT[eventType](callback);
};

// write a frame file to the given image folder, and frame index
videoAPI.writeFrame = (imageFolder, frameIndex, dataURL, callback) => {
    let data = dataURL.split(',')[1];
    let buf = Buffer.from(data, 'base64');
    //let filePath = path.join(imageFolder, 'frame-' + frameIndex + '.png'); 
    let filePath = path.join(imageFolder, 'frame-' + String(frameIndex).padStart(4, 0) + '.png'); 
    fs.writeFile(filePath, buf, (e) => {
        callback(e);
    });
};

// write js file text
videoAPI.writeJSFile = (filePath, text, callback) => {
    fs.writeFile(filePath, text, 'utf8', (e) => {
        callback(e);
    });
};

videoAPI.loadFile = (filePath, callback) => {
    if(filePath){
        // if path is not absolute
        if(!path.isAbsolute(filePath)){
            filePath = path.join(__dirname, filePath);
        }

        // read the file and set it to the client
        fs.readFile(filePath, 'utf8', (e, text) => {
            if(e){
                ipcRenderer.send('menuError', e);
            }else{
                callback(text, e, filePath);
            }
        });
    }else{
        ipcRenderer.send('menuError', new Error('no file path in the result object.') );
    }
};

// create an api for window objects in web pages
contextBridge.exposeInMainWorld('videoAPI', videoAPI);
