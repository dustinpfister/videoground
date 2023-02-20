// load app and BrowserWindow
const { app, Menu, BrowserWindow, dialog, ipcMain } = require('electron');
const path = require('path');
//-------- ----------
// CUSTOM MODULES
//-------- ----------
const userData = require( path.join(__dirname, 'lib/user-data/user-data.js') );
const CONSTANT = require( path.join(__dirname, 'lib/constants/constants.js') );
//-------- ----------
// HELPERS
//-------- ----------
// update the options object used for open and save as events to user data settings
const updateDilogOptions = (opt) => {
    return userData.get(CONSTANT.OPT_USERDATA_SETTINGS)
    .then((settings)=>{

console.log(settings);

        const folder = path.dirname( settings.uri_video_start);
        opt.defaultPath = folder;
        return Promise.resolve(opt);
    })
    .catch((e)=>{
        console.warn('Error updating dilog options with settings.json');
        console.warn(e.message);
        return Promise.resolve(opt);
     });
};
// save as dilog helper used in save as file menu item, and saveAsDialogRequest event at bottom of file
const saveAsDialog =  (opt_saveas) => {
     opt_saveas = opt_saveas || {
         properties: ['showHiddenFiles']
     };

console.log(opt_saveas);

     const mainWindow = BrowserWindow.fromId(1);
     return dialog.showSaveDialog(mainWindow, opt_saveas)
     .then((result) => {
         if(result.canceled){
             mainWindow.webContents.send('menuCanceled', result);
         }else{
             mainWindow.webContents.send('menuSaveAsFile', result);
         }
    }).catch((err) => {
        mainWindow.webContents.send('menuError', err);
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
            // open a file
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
            // save the current file
            {
                label: 'Save',
                click: () => {
                    const mainWindow = BrowserWindow.fromId(1);
                    // just trigger the event
                    mainWindow.webContents.send('menuSaveFile');
                }
            },
            // SAVE AS FILE MENU OPTION
            {
                label: 'Save As',
                click: () => {
                    const opt_saveas = {
                        properties: ['showHiddenFiles']
                    };
                    updateDilogOptions(opt_saveas)
                    .then( (opt_saveas) => {
                        saveAsDialog(opt_saveas);
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
            },
            // quit
            isMac ? { role: 'close' }: { role: 'quit' }
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

//-------- ----------
// EVENTS
//-------- ----------
ipcMain.on('saveAsDialogRequest', function(evnt, opt_saveas){
    updateDilogOptions(opt_saveas)
    .then( (opt_saveas) => {
        saveAsDialog(opt_saveas);
    });
});

module.exports = MainMenuTemplate;
