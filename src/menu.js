import {Menu, app} from 'electron'

const template = [
  {
    label: "Application",
    submenu: [
        { label: "About Application", selector: "orderFrontStandardAboutPanel:" },
        { type: "separator" },
        { label: "Quit", accelerator: "Command+Q", click: function() { app.quit(); }}
    ]
  }, {
    label: "Edit",
    submenu: [
        { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
        { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
        { type: "separator" },
        { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
        { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
        { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
        { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
    ]
  }, {
    label: 'View',
    submenu: [
      {
        label: 'Toggle Dev Tools',
        role: 'toggledevtools'
      }
    ]
  },
  {
    label: 'Query',
    submenu: [
      {
        label: 'Run Query',
        accelerator: 'CmdOrCtrl+Enter',
        click: function (item, focusedWindow) {
          if(focusedWindow) {
            focusedWindow.webContents.send('AppMenuItemClicked', item)
          }
        }
      }
    ]
  }
];

export default Menu.buildFromTemplate(template)
