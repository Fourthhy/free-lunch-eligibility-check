// electron/main.js
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
// We'll add serialport or SDK logic here later

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // For secure IPC
      nodeIntegration: false, // Keep false for security
      contextIsolation: true, // Keep true for security
    },
  });

  // Load your Vite React app
  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
    mainWindow.webContents.openDevTools(); // Open DevTools in development
  } else {
    // Load the static HTML file for production builds
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// --- RFID Scanner specific IPC handlers will go here later ---
// Example:
// ipcMain.handle('start-rfid-scan', async (event, options) => { /* ... */ });
// ipcMain.handle('stop-rfid-scan', async () => { /* ... */ });
// mainWindow.webContents.send('rfid-data', tagId); // To send data back to React

// electron/main.js (continued)
// ... (previous code)

const { SerialPort } = require('serialport'); // If using serialport
// If using a manufacturer SDK, import/require it here

let rfidPort = null; // To hold the active serial port instance
let readBuffer = ''; // To accumulate data from serial port

// Function to list available serial ports (useful for UI)
ipcMain.handle('list-serial-ports', async () => {
  try {
    const ports = await SerialPort.list();
    return ports.map(port => ({ path: port.path, manufacturer: port.manufacturer }));
  } catch (error) {
    console.error("Error listing serial ports:", error);
    return [];
  }
});

// Function to start RFID scanning
ipcMain.handle('start-rfid-scan', async (event, options) => {
    const { portPath, baudRate = 9600 } = options; // Get port path and baud rate from React

    if (rfidPort && rfidPort.isOpen) {
        console.log('RFID port already open.');
        return { success: false, message: 'Scanner already active.' };
    }

    try {
        rfidPort = new SerialPort({
            path: portPath,
            baudRate: baudRate,
            // Add other serial port options if needed (e.g., dataBits, stopBits, parity)
            // autoOpen: false // Don't auto-open, we'll open manually
        });

        // Open the port
        await new Promise((resolve, reject) => {
            rfidPort.open(err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });

        console.log(`Serial port ${portPath} opened.`);

        // Data event listener
        rfidPort.on('data', (data) => {
            // Assuming the scanner sends ASCII or UTF-8 data
            readBuffer += data.toString('utf-8');

            // This logic depends heavily on how your scanner outputs data.
            // Common scenarios:
            // 1. Tag ID followed by a newline (\n) or carriage return (\r)
            // 2. Fixed-length tag IDs
            // 3. Tag IDs with start/end delimiters

            // Example: Tag ID followed by a newline
            let newlineIndex;
            while ((newlineIndex = readBuffer.indexOf('\n')) !== -1) {
                let tagId = readBuffer.substring(0, newlineIndex).trim(); // Remove whitespace
                readBuffer = readBuffer.substring(newlineIndex + 1); // Keep the rest

                if (tagId) {
                    console.log('Scanned Tag (Main Process):', tagId);
                    // Send the scanned ID to the Renderer process (React app)
                    mainWindow.webContents.send('rfid-data', tagId);
                }
            }
            // If your scanner uses \r\n, you might need to check for \r as well
            // Or if it's fixed length:
            // if (readBuffer.length >= EXPECTED_TAG_LENGTH) {
            //    let tagId = readBuffer.substring(0, EXPECTED_TAG_LENGTH);
            //    mainWindow.webContents.send('rfid-data', tagId);
            //    readBuffer = readBuffer.substring(EXPECTED_TAG_LENGTH);
            // }
        });

        // Error event listener
        rfidPort.on('error', (err) => {
            console.error('Serial port error:', err);
            mainWindow.webContents.send('rfid-error', err.message);
            stopRfidScan(); // Attempt to stop on error
        });

        // Close event listener
        rfidPort.on('close', () => {
            console.log('Serial port closed.');
            mainWindow.webContents.send('rfid-error', 'Scanner disconnected or port closed unexpectedly.');
            rfidPort = null; // Clear the port instance
        });

        return { success: true, message: 'Scanner started.' };

    } catch (error) {
        console.error('Failed to open serial port:', error);
        mainWindow.webContents.send('rfid-error', error.message);
        if (rfidPort && rfidPort.isOpen) {
            rfidPort.close(); // Ensure port is closed on error
        }
        rfidPort = null;
        return { success: false, message: error.message };
    }
});

// Function to stop RFID scanning
ipcMain.handle('stop-rfid-scan', async () => {
    if (rfidPort && rfidPort.isOpen) {
        await new Promise(resolve => rfidPort.close(resolve));
        rfidPort = null;
        console.log('RFID scanner stopped.');
        return { success: true, message: 'Scanner stopped.' };
    }
    console.log('RFID scanner not active.');
    return { success: false, message: 'Scanner not active.' };
});

// Handle app quit to ensure port is closed
app.on('will-quit', () => {
    if (rfidPort && rfidPort.isOpen) {
        rfidPort.close();
    }
});