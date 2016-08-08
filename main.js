const defaultMenu = require('electron-default-menu');

const {
    Menu,
    app,
    BrowserWindow
} = require('electron')
const shell = require('electron').shell
const dialog = require('electron').dialog

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

// Open handlers should be added on the first tick.
// These fire if the app is already running and the user
// drags files or URLs onto the dock icon, or if they set
// the app as a handler for a file type and then open a file
app.on('open-file', onOpen)

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 800,
        height: 600
    })

    // and load the index.html of the app.
    win.loadURL(`file://${__dirname}/index.html`)

    // Open the DevTools.
    //win.webContents.openDevTools()

    win.once('ready-to-show', () => {
        win.show()
    })

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null
    })

    const menu = defaultMenu(app, shell);
    Menu.setApplicationMenu(Menu.buildFromTemplate(menu));

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    app.quit()
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
//process.argv.forEach(onOpen)

function onOpen (e, path) {
  console.log("e: "+e)
  console.log("path: "+path)

  dialog.showErrorBox('Welcome Back', `You arrived from: ${path}`)

  /*e.preventDefault()

  if (app.ipcReady) {
    processArgv([ torrentId ])
  } else {
    argv.push(torrentId)
  }
  */
}
