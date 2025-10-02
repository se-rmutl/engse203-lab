import io from 'socket.io-client';

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:3001';
let socket = null;

/**
 * Connect WebSocket as Supervisor
 */
export const connectSocket = (supervisorCode) => {
    // ตัด connection เก่า (ถ้ามี)    
    if (socket) {
        socket.disconnect();
    }

    console.log('Connecting to WebSocket...', SOCKET_URL);

    // สร้าง connection
    socket = io(SOCKET_URL, {
        query: {
            supervisorCode: supervisorCode.toUpperCase(),
            type: 'supervisor'
        },
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000
    });

    // ✅ เพิ่ม: emit supervisor_connect เมื่อเชื่อมต่อสำเร็จ
    socket.on('connect', () => {
        console.log('Socket connected, sending supervisor_connect...');
        socket.emit('supervisor_connect', {
            supervisorCode: supervisorCode.toUpperCase()
        });
    });

    // เก็บไว้ใน window เพื่อ debug
    window.socket = socket;

    return socket;
};

/**
 * Disconnect WebSocket
 */
export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
        window.socket = null;
    }
};

/**
 * Get current socket instance
 */
export const getSocket = () => socket;