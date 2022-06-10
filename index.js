const electron = require("electron");
const ffmpeg = require("fluent-ffmpeg");
const { app, BrowserWindow, ipcMain } = electron;
let mainWindow;
app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    title: "Add Item",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  mainWindow.loadURL(`file://${__dirname}/index.html`);
});

ipcMain.on("video:submit", (event, path) => {
  console.log(path);
  ffmpeg.ffprobe(path, (err, metadata) => {
    mainWindow.webContents.send("video:metadata", metadata.format.duration);
  });
});
