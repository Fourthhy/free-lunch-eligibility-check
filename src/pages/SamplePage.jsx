import React, { useState, useEffect, useCallback } from 'react';

// Global 'electronAPI' exposed by preload.js
const electronAPI = window.electronAPI;

function RfidDisplayElectron() {
    const [displayedTagId, setDisplayedTagId] = useState('');
    const [scannerStatus, setScannerStatus] = useState('Idle'); // Connected, Scanning, Error
    const [portOptions, setPortOptions] = useState([]); // List of available serial ports
    const [selectedPortPath, setSelectedPortPath] = useState('');
    const [error, setError] = useState(null);

    // Fetch available serial ports on component mount
    useEffect(() => {
        const getPorts = async () => {
            if (electronAPI && electronAPI.listSerialPorts) {
                const ports = await electronAPI.listSerialPorts();
                setPortOptions(ports);
                if (ports.length > 0) {
                    setSelectedPortPath(ports[0].path); // Auto-select first port
                }
            } else {
                setError("Electron API not available. Are you running in Electron?");
            }
        };
        getPorts();
    }, []);

    // Effect for listening to RFID data from Electron Main process
    useEffect(() => {
        if (electronAPI) {
            const unsubscribeRfidData = electronAPI.onRfidData((tagId) => {
                setDisplayedTagId(tagId);
                console.log("Tag ID received in React:", tagId);
                setError(null); // Clear any previous error
            });

            const unsubscribeRfidError = electronAPI.onRfidError((errorMessage) => {
                setError(`Scanner Error: ${errorMessage}`);
                setScannerStatus('Error');
                setDisplayedTagId(''); // Clear displayed tag on error
                console.error("RFID Error received in React:", errorMessage);
            });

            // Cleanup subscription on component unmount
            return () => {
                unsubscribeRfidData();
                unsubscribeRfidError();
            };
        }
    }, []); // Only run this effect once on mount/unmount

    const handleStartScan = async () => {
        if (!selectedPortPath) {
            setError("Please select a serial port.");
            return;
        }
        if (electronAPI && electronAPI.startRfidScan) {
            setScannerStatus('Connecting...');
            setError(null);
            const result = await electronAPI.startRfidScan({ portPath: selectedPortPath, baudRate: 9600 }); // Adjust baud rate if needed
            if (result.success) {
                setScannerStatus('Scanning');
                setDisplayedTagId(''); // Clear previous tag
            } else {
                setScannerStatus('Error');
                setError(result.message);
            }
        }
    };

    const handleStopScan = async () => {
        if (electronAPI && electronAPI.stopRfidScan) {
            setScannerStatus('Stopping...');
            const result = await electronAPI.stopRfidScan();
            if (result.success) {
                setScannerStatus('Idle');
            } else {
                setScannerStatus('Error');
                setError(result.message);
            }
        }
    };

    const handleClearDisplay = () => {
        setDisplayedTagId('');
        setError(null);
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: 'auto', textAlign: 'center' }}>
            <h1>Electron RFID Tag Display</h1>
            <p>Select your RFID scanner's serial port and start scanning.</p>

            <div style={{ marginBottom: '20px' }}>
                <label htmlFor="port-select" style={{ marginRight: '10px' }}>Select Port:</label>
                <select
                    id="port-select"
                    value={selectedPortPath}
                    onChange={(e) => setSelectedPortPath(e.target.value)}
                    disabled={scannerStatus === 'Scanning' || scannerStatus === 'Connecting'}
                    style={{ padding: '8px', borderRadius: '4px' }}
                >
                    {portOptions.length > 0 ? (
                        portOptions.map(port => (
                            <option key={port.path} value={port.path}>
                                {port.path} {port.manufacturer ? `(${port.manufacturer})` : ''}
                            </option>
                        ))
                    ) : (
                        <option value="">No serial ports found</option>
                    )}
                </select>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '30px' }}>
                <button
                    onClick={handleStartScan}
                    disabled={scannerStatus === 'Scanning' || scannerStatus === 'Connecting' || !selectedPortPath}
                    style={{ padding: '10px 20px', fontSize: '1em', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                >
                    Start Scan
                </button>
                <button
                    onClick={handleStopScan}
                    disabled={scannerStatus !== 'Scanning'}
                    style={{ padding: '10px 20px', fontSize: '1em', backgroundColor: '#ffc107', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                >
                    Stop Scan
                </button>
                <button
                    onClick={handleClearDisplay}
                    style={{ padding: '10px 20px', fontSize: '1em', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                >
                    Clear Display
                </button>
            </div>

            <p>Scanner Status: <strong>{scannerStatus}</strong></p>
            {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}

            <div style={{
                marginTop: '30px',
                padding: '25px',
                border: '2px solid #007bff',
                borderRadius: '8px',
                backgroundColor: '#e6f2ff',
                minHeight: '100px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
            }}>
                {displayedTagId ? (
                    <>
                        <p style={{ fontSize: '1.2em', margin: '0' }}>Your RFID Tag ID:</p>
                        <p style={{
                            fontSize: '2.5em',
                            fontWeight: 'bold',
                            color: '#333',
                            wordBreak: 'break-all'
                        }}>{displayedTagId}</p>
                    </>
                ) : (
                    <p style={{ fontSize: '1.2em', color: '#555' }}>Waiting for scan...</p>
                )}
            </div>
        </div>
    );
}

export default RfidDisplayElectron;