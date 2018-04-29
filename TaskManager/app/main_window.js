const electron = require('electron');
const { BrowserWindow } = electron;

class MainWindow extends BrowserWindow {

  constructor(options){
    super(options);
    this.on('blur', this.onBlur.bind(this));
  }

  onBlur(event, bounds){
    this.hide();
  }

}

module.exports = MainWindow;
