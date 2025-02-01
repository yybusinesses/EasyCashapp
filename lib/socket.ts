import { io } from 'socket.io-client'

declare const process: {
  env: {
    NEXT_PUBLIC_WEBSOCKET_URL: string;
  };
};

export const socket = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL, {
  autoConnect: false
})

export const connectSocket = (userId: string) => {
  socket.auth = { userId }
  socket.connect()
}

export const disconnectSocket = () => {
  socket.disconnect()
} 