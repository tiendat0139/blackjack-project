import io from 'socket.io-client'

const ENDPOINT = 'http://localhost:5000'

const socket = io(ENDPOINT, {  
  cors: {
    origin: "http://localhost:5000",
    credentials: true
  },
  transports: ['websocket']
});

export default socket