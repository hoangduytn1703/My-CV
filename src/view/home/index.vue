<template>
  <div class="chat-container">
    <nav class="history-container">
      <button class="addNewConversation" @click="addNewConversation">
        Create new conversation
      </button>
      <div v-for="conversation in conversations" :key="conversation.id">
        <div @click="loadMessages(conversation.id)">
          {{ conversation.title }}
        </div>
      </div>
    </nav>
    <div class="chat-box">
      <div class="chat-box-list">
        <div class="" v-for="message in messages" :key="message.id">
          {{ message.content }}
        </div>
      </div>

      <div
        class="form-cus stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
        <form @submit.prevent="sendMessage"
          class="flex flex-col w-full py-[10px] flex-grow md:py-4 md:pl-4 relative border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-xl shadow-xs dark:shadow-xs">
          <input type="text"
            class="m-0 w-full resize-none border-0 bg-transparent p-0 pr-10 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:pr-12 pl-3 md:pl-0"
            v-model="newMessage" />
          <button type="submit"
            class="absolute p-1 rounded-md md:bottom-3 md:p-2 md:right-3 dark:hover:bg-gray-900 dark:disabled:hover:bg-transparent right-2 disabled:text-gray-400 enabled:bg-brand-purple text-white bottom-1.5 transition-colors disabled:opacity-40">
            <span class="" data-state="closed">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" class="h-4 w-4 m-1 md:m-0"
                stroke-width="2">
                <path
                  d="M.5 1.163A1 1 0 0 1 1.97.28l12.868 6.837a1 1 0 0 1 0 1.766L1.969 15.72A1 1 0 0 1 .5 14.836V10.33a1 1 0 0 1 .816-.983L8.5 8 1.316 6.653A1 1 0 0 1 .5 5.67V1.163Z"
                  fill="currentColor"></path>
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

import axios from "axios";
import { socket } from "../../../src/socket.js";

import { defineComponent, ref, onMounted, onUpdated, watch } from "vue";

export default defineComponent({
  name: "Home",
  setup() {

    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("id");
    const historyContainer = ref(null);
    const conversations: any = ref([]);
    const messages = ref([
      { id: 1, content: "Hello" },
      { id: 2, content: "How are you?" },
      { id: 3, content: "I am fine, thank you." },
    ]);
    const isSocketConnected = ref(false);

    onMounted(async () => {
      //Kết nối socket



      try {
        const response = await axios.get(
          "https://api-coderpush-gpt.weesmartvn.com/chat/conversations",
          {
            params: {
              userId,
            },
          }
        );

        conversations.value = response.data.data;
      } catch (error) {
        console.error(error);
      }
    });
    const handleConnect = () => {
      console.log('aaaaa');

      socket.connect();

    }
    const addNewConversation = () => {
      handleConnect()
      console.log("addNewConversation");
      console.log('connected:', socket.connected);
      // socket.emit('chat', {userId: 1, question: 'How are you?'});
    };

    const loadMessages = async (conversationId: number) => {

      try {
        const response = await axios.get(
          "https://api-coderpush-gpt.weesmartvn.com/chat/messages",
          {
            params: {
              userId: userId,
              conversationId: conversationId, // Truyền conversationId vào params
            },
          }
        );
        messages.value = response.data.data.reverse(); // Xử lý dữ liệu trả về từ API
        console.log('messages.value ', messages.value);

      } catch (error) {
        console.error(error);
      }
    };
    const newMessage = ref("");
    const sendMessage = () => {
      if (newMessage.value.trim()) {

        newMessage.value = "";
      }
    };
    // onUpdated(() => {
    //   socket.on("chat-rs", (message: any) => {
    //     console.log('message ', message);
    //   });

    // });
    watch(
      () => messages.value,
      (val: any) => {

        console.log("file: index.vue:127 ►► socket.on ►► message:", val);
      }
    );

    return {
      historyContainer,
      conversations,
      addNewConversation,
      loadMessages,
      messages,

      sendMessage,
      newMessage,
    };
  },
});
</script>
