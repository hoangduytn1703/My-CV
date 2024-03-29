import { reactive } from "vue";
import io from "socket.io-client";

export const state = reactive({
  connected: false,
  fooEvents: [],
  barEvents: [],
});

// "undefined" means the URL will be computed from the `window.location` object
// const URL = "ws://localhost:3004";
const URL = import.meta.env.VITE_VUE_APP_SOCKET_BASE;
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

socket.on("connect_error", (err) => {
  console.error("connect error:", err);
});

socket.on("disconnect", () => {
  state.connected = false;
});
