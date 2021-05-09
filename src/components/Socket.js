import { io } from 'socket.io-client';

const URL = 'https://lets-chat-server1.herokuapp.com';
const socket = io(URL);

export default socket;