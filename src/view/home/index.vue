<template>
  <div class="chat-container">
    <nav class="history-container">
      <li v-for="message in messages" :key="message.id">
        {{ message.text }}
      </li>

    </nav>
    <div class="chat-box">
      <div class="chat-box-list">
        <div class="" v-for="message in messages" :key="message.id">
          {{ message.text }}
        </div>
      </div>

      <div
        class=" form-cus stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
        <form @submit.prevent="sendMessage"
          class=" flex flex-col w-full py-[10px] flex-grow md:py-4 md:pl-4 relative border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-xl shadow-xs dark:shadow-xs">

          <input type="text"
            class="m-0 w-full resize-none border-0 bg-transparent p-0 pr-10 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:pr-12 pl-3 md:pl-0"
            v-model="newMessage">
          <button type="submit"
            class="absolute p-1 rounded-md md:bottom-3 md:p-2 md:right-3 dark:hover:bg-gray-900 dark:disabled:hover:bg-transparent right-2 disabled:text-gray-400 enabled:bg-brand-purple text-white bottom-1.5 transition-colors disabled:opacity-40">
            <span class="" data-state="closed">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" class="h-4 w-4 m-1 md:m-0"
                stroke-width="2">
                <path
                  d="M.5 1.163A1 1 0 0 1 1.97.28l12.868 6.837a1 1 0 0 1 0 1.766L1.969 15.72A1 1 0 0 1 .5 14.836V10.33a1 1 0 0 1 .816-.983L8.5 8 1.316 6.653A1 1 0 0 1 .5 5.67V1.163Z"
                  fill="currentColor">
                </path>
              </svg>
            </span>
          </button>
        </form>
      </div>


    </div>
  </div>
</template>


<script lang="ts">
import "./styles.scss";
import { io } from "socket.io-client";

import { defineComponent, ref, computed, onMounted } from 'vue';
import { commonHooks } from "../../core/hooks";
import { LIST_SHOP } from "../../core/store/shop/type";

const { storeDispatch } = commonHooks("storeShop");

export default defineComponent({
  name: 'Home',
  setup() {
    const message = ref('Hello, world!');
    const title = computed(() => `${message.value} - Home Page`);
    onMounted(async () => {
      const response = await storeDispatch(
        { func: LIST_SHOP, path: "storeShop" },
        "CCCCCCCCCCCC"
      );
      console.log('response ', response);

    })
    const reverseMessage = () => {
      const reversedMessage = message.value.split('').reverse().join('');
      console.log("file: index.vue:24  reverseMessage  reversedMessage:", reversedMessage)

    }
    const messages = ref([
      { id: 1, text: 'Hello' },
      { id: 2, text: 'How are you?' },
      { id: 3, text: 'I am fine, thank you.' },
    ]);

    const newMessage = ref('');

    const socket = io('http://localhost:3000');

    // Lắng nghe sự kiện "chat message" từ server và thêm tin nhắn mới vào danh sách tin nhắn
    socket.on('chat message', (msg) => {
      const id = messages.value.length + 1;
      messages.value.push({ id: id, text: msg });
    });

    const sendMessage = () => {
      // Gửi tin nhắn mới đến server thông qua sự kiện "chat message"
      socket.emit('chat message', newMessage.value);
      newMessage.value = '';
    }

    return {
      messages,
      newMessage,
      sendMessage,
      message,
      title,
      reverseMessage

    };
  },
});
</script>
