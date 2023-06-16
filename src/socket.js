import { reactive } from "vue";
import { io } from "socket.io-client";

export const state = reactive({
  connected: false,
  fooEvents: [],
  barEvents: [],
});

// "undefined" means the URL will be computed from the `window.location` object
const URL = "wss://chat-coderpush.weesmartvn.com";
console.log("11111111sss11111");
export const socket = io(URL);

socket.on("connect", () => {
  console.log("connectttt");
  state.connected = true;
});
