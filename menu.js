// load app and BrowserWindow
const { app, Menu, BrowserWindow, dialog } = require('electron');
const path = require('path');

// Custom Menus
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
                    const mainWindow = BrowserWindow.fromId(1);
                    dialog.showOpenDialog(mainWindow, {
                        properties: ['openFile']
                    }).then((result) => {
                        if(result.canceled){
                            mainWindow.webContents.send('menuCanceled', result);
                        }else{
                            mainWindow.webContents.send('menuOpenFile', result);
                        }
                    }).catch((err) => {
                        // error getting file path
                        mainWindow.webContents.send('menuError', err);
                    });
                }
            },
            // SAVE A FILE
            {
                label: 'Save As',
                click: () => {
                    const mainWindow = BrowserWindow.fromId(1);
                    dialog.showSaveDialog(mainWindow, {
                        properties: ['showHiddenFiles']
                    }).then((result) => {
                        if(result.canceled){
                            mainWindow.webContents.send('menuCanceled', result);
                        }else{
                            mainWindow.webContents.send('menuSaveFile', result);
                        }
                    }).catch((err) => {
                        mainWindow.webContents.send('menuError', err);
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
					
                    dialog.showMessageBox(mainWindow, {
                        message: 'VideoGround: r' + r + '\n' +
                        'electron: ' + process.versions['electron'] + '\n' +
                        'node: ' + process.versions['node'] + '\n' +
                        'chrome: ' + process.versions['chrome']
                    });
                }
            }
        ]
    }
];

module.exports = MainMenuTemplate;
