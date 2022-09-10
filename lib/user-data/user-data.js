// user-data.js - common user data methods to use in main.js and preload.js
const path = require('path');
const os = require('os');
const fs = require('fs');
const promisify = require('util').promisify;
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

// dirs
const dir_home = os.homedir();

//let dir_userdata = path.join(dir_home, '.videoground');
//let uri_data = path.join(dir_userdata, 'data.json');

// hard coded default data file state
//const data_default = {
//    dir_open_start: dir_home, // dir to look for files when doing an open for the first time
//    file_name: null            // no file by default
//};

//const DEFAULT_DIR_USERDATA = path.join(dir_home, '.videoground');

const DEFAULT_OPTIONS = {
    app_name: 'demoapp',
    file_name: 'data.js',
    data_default: {
        dir_open_start: dir_home,
        file_name: null
    }
};

// get the user data folder with the given options object
// such as: /home/joe/.demoapp/
const getDirUserData = (opt) => {
    return path.join(dir_home, '.' + opt.app_name);
};

// get URI of the file to get and set values
// such as: /home/joe/.demoapp/data.js
const getURI = (opt) => {
    return path.join(getDirUserData(opt), opt.file_name);
};


// create user data folder
const createUserDataFolder = function(opt){
    return new Promise((resolve, reject) => {
        fs.mkdir( getDirUserData(opt), { recursive: true }, (err) => {
            if (err){
                reject(err);
            }else{
                console.log('user data folder check went well');
                resolve();
            }
        });
    });
};

// create the data file if it is not there
const createUserDataFile = function(opt){
    let uri_data = getURI(opt);
    return readFile(uri_data, 'utf8')
    .then((text)=>{
        console.log('looks like we have a user data file, so no need to create a new one');
        return Promise.resolve(text);
    })
    // error reading file
    .catch((e)=>{
        console.log('error reading user data file, maybe it is not there...');
        if(e.code === 'ENOENT'){
            console.log('error code is ENOENT, so wrting a new one from hard coded data.');
            return writeFile(uri_data, JSON.stringify(opt.data_default), 'utf8' )
        }
        // some other error happened that has not been handled here
        return Promise.reject(e);
    });
};

// public api
var api = module.exports = {};

// create any missinbg user data files and folders, shuld be called each time main.js starts
api.create = function(opt){
    opt = opt || DEFAULT_OPTIONS;
    opt = Object.assign({}, DEFAULT_OPTIONS, opt);

    return createUserDataFolder(opt)
    .then(()=>{
    // create the user data file if it is not there
        return createUserDataFile(opt);
    });
};

// get the user data
api.get = (opt) => {
    let uri_data = getURI(opt);
    return readFile(uri_data, 'utf8')
    .then((jText)=>{
        try{
            return JSON.parse(jText);
        }catch(e){
            return Promise.reject(e);
        }
    });
};

// set a user data key
api.set = (opt, key, value) => {
    let uri_data = getURI(opt);
    // first get curent set of data
    return api.get(opt)
    .then((obj)=>{
        // update key and write new data
        obj[key] = value;
        return writeFile( uri_data, JSON.stringify(obj) );
    });
};

// read file current file based on user data
/*
api.readFile = () => {
    return api.get()
    .then((obj)=>{
       if(obj.file_name){
          return readFile( path.join(obj.dir_open_start, obj.file_name), 'utf8' );
       }else{
          return Promise.reject( new Error('file name is null') )
       }
    });
};

// save given text to file with current settings
api.saveFile = (text) => {
    text = text || '';
    return api.get()
    .then((obj)=>{
       if(obj.file_name){
          return writeFile( path.join(obj.dir_open_start, obj.file_name), text, 'utf8' );
       }else{
          return Promise.reject( new Error('file name is null') )
       }
    });
};
*/
