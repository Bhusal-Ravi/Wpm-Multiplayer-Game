import { createContext } from 'react';
import { io } from 'socket.io-client';

export const socket = io('https://wpm-multiplayer-game.onrender.com');
export const SocketContext = createContext(socket);
