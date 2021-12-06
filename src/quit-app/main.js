const { ipcMain, app } = require("electron");

ipcMain.on("quit-application", () => {
  app.quit();
});
