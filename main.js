// load app and BrowserWindow
const { app, Menu, BrowserWindow, dialog } = require('electron');
const path = require('path');

// Create the Main browser window.
function createMainWindow() {
    const mainWindow = new BrowserWindow({
            width: 900,
            height: 700,
            backgroundColor: '#008888',
            webPreferences: {
                // I tried to disable webSecurity to see if that would fix the isshue with CSP and vuejs (did not work)
                webSecurity: true,
                contextIsolation: true,
                preload: path.resolve( __dirname, 'preload.js')
            }
        });
    // load the html file for the main window
    mainWindow.loadFile('html/window_main_r140.html');
    // Open the DevTools for debugging
    mainWindow.webContents.openDevTools();
    const menu = Menu.buildFromTemplate( require( path.join(__dirname, 'menu.js') ) );
    mainWindow.setMenu(menu);
    return mainWindow;
};

// the 'ready' event
app.whenReady().then(() => {
    var mainWindow = createMainWindow();
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0){
            createMainWindow();
            //createMainWindow();
        }
    })
});
// the 'window-all-closed' is also a kind of on quit event
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin')
        app.quit()
});