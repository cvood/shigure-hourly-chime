import { Tray, app, BrowserWindow, Menu, globalShortcut,ipcMain } from 'electron'
import path from 'path'
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
let timeline
let commitWindow
const winURL = process.env.NODE_ENV === 'development' ?
    `http://localhost:9080` :
    `file://${__dirname}/index.html`

function createWindow() {
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
        show: false,
        skipTaskbar: true
    })

    mainWindow.loadURL(winURL)


    setTimeout(() => {
        mainWindow = null
    }, 10000);

}

function timelineWindow() {
    timeline = new BrowserWindow({
        height: 500,
        width: 350,
        frame: false,
        transparent: true
    })

    timeline.loadURL(winURL + '/#/timeline')

}

function createCommitWindow(){
    commitWindow = new BrowserWindow({
        height: 330,
        width: 550,
        frame: false,
        transparent: true
    })
    commitWindow.loadURL(winURL+'/#/commit')
}

var appIcon = null
var icon_path = path.join(__static, 'shigure_icon.png')
var createTrayIcon = function() {
    appIcon = new Tray(icon_path)
    let contextMenu = Menu.buildFromTemplate([
        { label: 'Quit', click: function() { app.quit() } }
    ])
    appIcon.setToolTip('Read Time with Shigure')
    appIcon.setContextMenu(contextMenu)
}

var createFunc = function() {
    let ret
    let nowTime = new Date()
    let minute = nowTime.getMinutes()
    let second = nowTime.getSeconds()
    let one_hour_ms = 60 * 60 * 1000
    let msecond = minute * 60 * 1000 + second * 1000
    let timeout = one_hour_ms - msecond
    timelineWindow()
    createTrayIcon()
    setTimeout(() => {
        createWindow()
        setInterval(createWindow, 3600000)
    }, timeout);
    ret = globalShortcut.register('CommandOrControl+Alt+J', () => {
        createCommitWindow()
    })
}

app.on('ready', createFunc)

app.on('will-quit', () => {
    // 清空所有快捷键
    globalShortcut.unregisterAll()
})

ipcMain.on('close-insertWindow', (event, arg) => {
    commitWindow.close()
    timeline.reload()
    event.returnValue = 'ok'
})
// app.on('activate', () => {
//     if (mainWindow === null) {
//         createWindow()
//     }
// })

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */