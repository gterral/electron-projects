const electron = require('electron');
const { Tray, app, Menu } = electron;

class TimerTray extends Tray {

  constructor(iconPath, mainWindow){
    super(iconPath)
    this.mainWindow = mainWindow;
    this.setToolTip('Timer App');
    this.on('click', this.onClick.bind(this));
    this.on('right-click', this.onRightClick.bind(this));
  }

  onClick(event,bounds){
    const {x, y } = bounds;
    const { height, width } = this.mainWindow.getBounds();

    if (this.mainWindow.isVisible()){
      this.mainWindow.hide();
    } else {
      this.mainWindow.setBounds({
        height,
        width,
        x: x - width/2,
        y: process.plateform === 'win32' ? y - height : y,
      });
      this.mainWindow.show();
    }
  }

  onRightClick(event, bounds){
    const menuConfig = Menu.buildFromTemplate([
      {
        label: 'Quit',
        click: () => app.quit()
      }
    ]);

    this.popUpContextMenu(menuConfig);
  }
}

module.exports = TimerTray;
