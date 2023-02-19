// load app and BrowserWindow
const { app, Menu, BrowserWindow, dialog } = require('electron');
const path = require('path');
//-------- ----------
// CUSTOM MODULES
//-------- ----------
const userData = require( path.join(__dirname, 'lib/user-data/user-data.js') );
const CONSTANT = require( path.join(__dirname, 'lib/constants/constants.js') );
//-------- ----------
// HELPERS
//-------- ----------
const updateDilogOptions = (opt) => {
    return userData.get(CONSTANT.OPT_USERDATA_SETTINGS)
    .then((settings)=>{
        const folder = path.dirname( settings.uri_video_start);
        opt.defaultPath = folder;
        return Promise.resolve(opt);
    })
    .catch(()=>{
        console.warn('Error updaing dilog options with settings.json');
        return Promise.resolve(opt);
     });
};
//-------- ----------
// MENU
//-------- ----------
const isMac = process.platform === 'darwin';
const pkg = require( path.join(__dirname, 'package.json') );
// The main menu for the main window
const MainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            isMac ? { role: 'close' }: { role: 'quit' },
            {
                label: 'Open',
                click: function(){
                    const opt_open = {
                        defaultPath: '/',
                        properties: ['openFile']
                    };
                    updateDilogOptions(opt_open)
                    .then( (opt_open) => {
                        const mainWindow = BrowserWindow.fromId(1);
                        dialog.showOpenDialog(mainWindow, opt_open)
                        .then((result) => {
                            if(result.canceled){
                                mainWindow.webContents.send('menuCanceled', result);
                            }else{
                                mainWindow.webContents.send('menuOpenFile', result);
                            }
                        }).catch((err) => {
                            // error getting file path
                            mainWindow.webContents.send('menuError', err);
                        });
                    });
                }
            },
            // SAVE A FILE
            {
                label: 'Save As',
                click: () => {
                    const opt_save = {
                        properties: ['showHiddenFiles']
                    };
                    updateDilogOptions(opt_save)
                    .then( (opt_save) => {
                        const mainWindow = BrowserWindow.fromId(1);
                        dialog.showSaveDialog(mainWindow, opt_save)
                        .then((result) => {
                            if(result.canceled){
                                mainWindow.webContents.send('menuCanceled', result);
                            }else{
                                mainWindow.webContents.send('menuSaveFile', result);
                            }
                        }).catch((err) => {
                            mainWindow.webContents.send('menuError', err);
                        });
                    });
                }
            },
            // EXPORT TO IMAGES
            {
                label: 'Export to Images',
                click: function(){
                    const mainWindow = BrowserWindow.fromId(1);
                    // dialog will need to be used to select a folder
                    dialog.showOpenDialog(mainWindow, {
                        properties: ['openDirectory']
                    }).then((result) => {
                        if(result.canceled){
                            mainWindow.webContents.send('menuCanceled', result);
                        }else{
                            mainWindow.webContents.send('menuExport', result, 'images');
                        }
                    }).catch((err) => {
                        // error getting file path
                        mainWindow.webContents.send('menuError', err);
                    });
                }
            }
        ]
    },
    {
        label: 'View',
        submenu: [
            {role: 'togglefullscreen'},
            { role: 'toggleDevTools' }
        ]
    },
    {
        label: 'Help',
        submenu: [
            {
                label: 'About',
                click: function(){
                    const mainWindow = BrowserWindow.fromId(1);
                    // electron revision number
                    const r = pkg.version.split('.')[1];
                    //!!! r6 change - calling new menu about event
                    mainWindow.webContents.send('menuAbout');
                    /*
                    dialog.showMessageBox(mainWindow, {
                        message: 'VideoGround: r' + r + '\n' +
                        'electron: ' + process.versions['electron'] + '\n' +
                        'node: ' + process.versions['node'] + '\n' +
                        'chrome: ' + process.versions['chrome'] + '\n'
                    });
                    */
                }
            }
        ]
    }
];

module.exports = MainMenuTemplate;
