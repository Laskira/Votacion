const { app, BrowserWindow, Menu, session } = require("electron");

Menu.setApplicationMenu(false);

let win;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    frame: true,
    width: 1280,
    height: 720,
    icon: (`file://${__dirname}/icons/icon.png`)
  });

  win.loadURL(`file://${__dirname}/dist/index.html`);

  session.defaultSession.clearStorageData();

  // Event when the window is closed.
  win.on("closed", function() {
    win = null;
  });
}

// Create window on electron intialization
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function() {
  // On macOS specific close process
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function() {
  // macOS specific close process
  if (win === null) {
    createWindow();
  }
});
