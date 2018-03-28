const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

//Initial view object
let view;

function makeView() {
    // Create the initial view.
    view = new BrowserWindow({
        width: 800,
        height: 600
    });

    //Loading initial view
    view.loadURL(url.format({
        pathname: path.join(__dirname, '../views/index.html'),
        protocol: 'file:',
        slashes: true
    }));

    //Open devtools from browser.
    view.webContents.openDevTools();

    //Clear view when it's closed
    view.on('closed', () => {
        view = null
    });
}

//Create view when electron is ready
app.on('ready', makeView());

//Close app when all views are closed
app.on('window-all-closed', () => {
    //On macOS is with CMD + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    //Create view when it doesn't exists
    if (view === null) {
        makeView()
    }
});