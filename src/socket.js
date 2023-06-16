import { reactive } from "vue";
import io from "socket.io-client";

export const state = reactive({
  connected: false,
  fooEvents: [],
  barEvents: [],
});

// "undefined" means the URL will be computed from the `window.location` object
const URL = "wss://chat-coderpush.weesmartvn.com";

export const socket = io(URL, {
  autoConnect: true,
  path: "/socket.io",
  allowEIO3: true,
  transports: ["websocket", "xhr-polling", "htmlfile", "jsonp-polling"],
});

// socket.connect();
// socket.emit('chat', {userId: 12, question: 'How are you?'});

socket.on("connect", () => {
  state.connected = true;
});

socket.on("chat-rs", (data) => {
  console.log("chat-rs: ", data);
});

socket.on("connect_error", (err) => {
  console.error("connect error:", err);
  console.log(`connect_error due to ${err.message}`);
});

socket.on("disconnect", () => {
  console.log("disconnect cmnr");
  state.connected = false;
});
