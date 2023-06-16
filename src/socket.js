import { reactive } from "vue";
import io from 'socket.io-client';


export const state = reactive({
  connected: false,
  fooEvents: [],
  barEvents: [],
});

// "undefined" means the URL will be computed from the `window.location` object
const URL = "ws://localhost:3004";
console.log("11111111sss11111");
export const socket = io(URL, {autoConnect: true, path: '/socket.io', allowEIO3: true, transports: ["websocket", "xhr-polling", "htmlfile", "jsonp-polling"]});
console.log('socket:', socket);
// socket.connect();
// socket.emit('chat', {userId: 12, question: 'How are you?'});

socket.on("connect", () => {
  console.log("connectttt");
  state.connected = true;
});

socket.on("connect_error", (err) => {
  console.error('connect error:', err);
  console.log(`connect_error due to ${err.message}`);
});

socket.on("disconnect", () => {
  console.log("disconnect cmnr");
  state.connected = false;
});
