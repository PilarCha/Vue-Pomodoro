const electron = window.require("electron");
const { ipcRenderer } = electron;

export default function quitApp() {
  ipcRenderer.send("quit-application");
}
