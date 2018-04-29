const path = require('path');
const electron = require('electron');
const TimerTray = require('./app/timer_tray.js');
const MainWindow = require('./app/main_window.js');

const { app, ipcMain } = electron;

let mainWindow;
let tray;

app.on('ready',() => {
  app.dock.hide();

  mainWindow = new MainWindow({
    height: 500,
    width: 300,
    frame: false,
    resizable: false,
    show: false,
    webPreferences: { backgroundThrottling: false}
  });
  mainWindow.loadURL(`file://${__dirname}/src/index.html`);

  const iconName = process.plateform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png'
  const iconPath = path.join(__dirname,`./src/assets/${iconName}`)
  tray = new TimerTray(iconPath, mainWindow);

});

ipcMain.on('update-timer', (event, timeLeft) => {
  tray.setTitle(timeLeft);
})
