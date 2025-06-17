// electron/preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Expose functions for your React app to call Main process
  startRfidScan: (options) => ipcRenderer.invoke('start-rfid-scan', options),
  stopRfidScan: () => ipcRenderer.invoke('stop-rfid-scan'),
  // Expose a way for Main process to send data to Renderer
  onRfidData: (callback) => ipcRenderer.on('rfid-data', (event, data) => callback(data)),
  onRfidError: (callback) => ipcRenderer.on('rfid-error', (event, error) => callback(error)),
});