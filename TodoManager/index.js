const electron = require('electron');
const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;
let addWindow;

app.on('ready',() =>{
  mainWindow = new BrowserWindow({});
  mainWindow.loadURL(`file://${__dirname}/main.html`)

  mainWindow.on('closed', () => app.quit());

  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);
});

function createAddWindow(){
  addWindow = new BrowserWindow({
    height:200,
    width:300,
    title: 'Add New Todo'
  });
  addWindow.loadURL(`file://${__dirname}/add.html`)
  addWindow.on('closed',() => addWindow = null);
}

ipcMain.on('todo:add', (event, value) => {
  mainWindow.webContents.send('todo:add',value);
  addWindow.close();
});

const menuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'New Todo',
        click(){
          createAddWindow();
        }
      },
      {
        label: 'Clear Todos',
        click(){
          mainWindow.webContents.send('todo:clear');
        }
      },
      {
        label: 'Quit',
        accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click(){
          app.quit();
        }
      }
    ]
  }
];

if (process.platform === 'darwin') {
  menuTemplate.unshift({});
}

if (process.env.NODE_ENV !== 'production') {
  menuTemplate.push({
    label: 'Developer View',
    submenu: [
      {
        label: 'Toggle Developer Tools',
        accelerator: process.platform === 'darwin' ? 'Command+Alt+I' : 'Ctrl+Shift+I',
        click(item, focusedWindow){
          focusedWindow.toggleDevTools();
        }
      },
      { role: 'reload' }
    ]
  });
}
