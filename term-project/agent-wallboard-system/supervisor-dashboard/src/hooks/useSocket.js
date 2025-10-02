import { useEffect, useRef } from 'react';
import { connectSocket, disconnectSocket } from '../services/socket';

export const useSocket = (supervisorCode, onConnect) => {
  const socketRef = useRef(null);

  useEffect(() => {
    if (supervisorCode) {
      // Connect
      console.log('useSocket: Connecting...');
      socketRef.current = connectSocket(supervisorCode);

      // Callback เมื่อเชื่อมต่อสำเร็จ
      if (onConnect) {
        socketRef.current.on('connect', onConnect);
      }

      // Cleanup: Disconnect เมื่อ unmount
      return () => {
        console.log('useSocket: Disconnecting...');
        disconnectSocket();
      };
    }
  }, [supervisorCode, onConnect]);

  return socketRef.current;
};