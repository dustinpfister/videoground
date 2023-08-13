//-------- ----------
// NODE CORE MODULES
//-------- ----------
const { contextBridge, ipcRenderer} = require('electron');
const path = require('path');
const fs = require('fs');
const promisify = require('util').promisify;
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
//-------- ----------
// CONSTS
//-------- ----------
const CONSTANT = require( path.join(__dirname, 'lib/constants/constants.js') )
const REVISION = CONSTANT.REVISION;
const URI_VIDEO_START = CONSTANT.URI_VIDEO_START;
const OPT_USERDATA_SETTINGS = CONSTANT.OPT_USERDATA_SETTINGS;
//-------- ----------
// CUSTOM MODULES
//-------- ----------
const userData = require( path.join(__dirname, 'lib/user-data/user-data.js') );
const rangeRead = require( path.join(__dirname, 'lib/range-read/range-read.js') );
const writer = require( path.join(__dirname, 'lib/writer-append/writer-append.js') );
//-------- ----------
// CREATE USER DATA OBJECT
//-------- ----------
userData.create(OPT_USERDATA_SETTINGS)
.catch((e)=>{
    console.warn('error creating user data file:');
    console.warn(e.message);
})
.then((obj)=>{
    console.log('user data file looks good');
    console.log(obj);
});
//-------- ----------
// VIDEO API
//-------- ----------
let videoAPI = {
  r: REVISION
};
// write data using the writer append lib
videoAPI.write = ( uri, array_bytes, clear ) => {
    return writer.append(uri, array_bytes, clear);
};
// read file data
videoAPI.read = ( uri, opt ) => {
    return rangeRead.read( uri, opt )
    .then( (data) => {
        return data;
    });
};
// get the settings object
videoAPI.getSettings = () => {
    return userData.get(OPT_USERDATA_SETTINGS);
};
// logging
videoAPI.log = ( mess, id ) => {
    //console.log('----------');
    if(typeof mess === 'string' || typeof mess === 'number'){
        console.log(id + ':' + mess);
    }else{
        console.log(id + ':' );
        console.log(mess)
    }
    //console.log('----------');
};
const log =  (mess)=> {
    videoAPI.log(mess, 'preload.js');
};
videoAPI.dir_root = __dirname;
videoAPI.pathJoin = path.join;
videoAPI.pathBasename = path.basename;
videoAPI.pathDirname = path.dirname;
// start video URI value
videoAPI.uri_startvideo = URI_VIDEO_START;
// wgl2 test
videoAPI.webGL2_test_pass = false;
videoAPI.setWebGLTest = function(testResult){
    videoAPI.webGL2_test_pass = testResult;
};
// the events object
const EVENT = {};
// about menu
EVENT.menuAbout = function(callback){
    ipcRenderer.on('menuAbout', function(evnt){
        callback(evnt);
        const about = {
            webGL2_test_pass: videoAPI.webGL2_test_pass,
            r: REVISION
        };
        ipcRenderer.send('menuAboutMessageReady', about);
    });
};
// menu canceled event
EVENT.menuCanceled = function(callback){
    ipcRenderer.on('menuCanceled', callback);
};
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
// save as a file
EVENT.menuSaveFile = function(callback){
    ipcRenderer.on('menuSaveFile', callback);
};
// save as a file
EVENT.menuSaveAsFile = function(callback){
    ipcRenderer.on('menuSaveAsFile', callback);
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
    callback = callback || function(){};
    let data = dataURL.split(',')[1];
    let buf = Buffer.from(data, 'base64');
    let filePath = path.join(imageFolder, 'frame-' + String(frameIndex).padStart(6, 0) + '.png'); 
    return writeFile(filePath, buf, 'binary')
    .then(()=>{
         callback(null);
         return Promise.resolve();
     })
     .catch((e)=>{
         callback(e);
         return Promise.reject(e);
     });
};
// write js file text
videoAPI.writeJSFile = (filePath, text, callback) => {
    callback = callback || function(){};
    return writeFile(filePath, text, 'utf8')
    .then(()=>{
         //!!! r7 change - update start video to this file on each load
         userData.set(OPT_USERDATA_SETTINGS, 'uri_video_start', filePath);
         // calback and promise
         callback(null);
         return Promise.resolve();
     })
     .catch((e)=>{
         callback(e);
         return Promise.reject(e);
     });
};
// load a javascript video file
//!!! BUG #2 has to do with this, and as of r5 I can not seem to find out what is wrong thus far
videoAPI.loadFile = (filePath, callback) => {
    log('loadFile method called for ' + filePath);
    callback = callback || function(){};
    if(filePath){
        // if path is not absolute
        if(!path.isAbsolute(filePath)){
            filePath = path.join(__dirname, filePath);
        }
        // read the file and send it to the client
        return readFile(filePath, 'utf8')
        .then((text)=>{
            //!!! r7 change - update start video to this on each load
            userData.set(OPT_USERDATA_SETTINGS, 'uri_video_start', filePath);
            // callback and return promise
            callback(text, null, filePath);
            return Promise.resolve({
                text: text,
                e: null,
                filePath: filePath
            });
        })
        .catch((e)=>{
            callback(null, e, filePath);
            return Promise.reject(e);
        })
    }else{
        let e = new Error('no file path in the result object.');
        ipcRenderer.send('menuError', e );
        return Promise.reject(e);
    }
};

videoAPI.saveAsDialog = (opt_saveas) => {
    opt_saveas = opt_saveas || {
         properties: ['showHiddenFiles']
    };
    ipcRenderer.send('saveAsDialogRequest', opt_saveas);
};

// create an API for window objects in web pages
contextBridge.exposeInMainWorld('videoAPI', videoAPI);
