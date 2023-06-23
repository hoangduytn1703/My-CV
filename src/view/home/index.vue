<template>
  <div class="chat-container">
    <nav class="history-container">
      <button class="addNewConversation" @click="addNewConversation">
        + &nbsp;&nbsp;&nbsp;New chat
      </button>
      <div v-for="(conversation, index) in conversations" :key="conversation.id">
        <div @click="loadMessages(conversation.id)">
          {{ index + 1 }} / &nbsp;&nbsp;{{ conversation.title }}
        </div>
      </div>
    </nav>
    <div class="chat-box">
      <div class="chat-box-list">
        <div class="" v-for="message in messages" :key="message.id"
          :class="[message.is_chat_bot ? 'bg-blue-500' : 'bg-red-500']">
          {{ message.content }}
        </div>
      </div>

      <div
        class="form-cus stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
        <form @submit.prevent="sendMessage"
          class="form-cus2 flex flex-col w-full py-[10px] flex-grow  md:pl-4 relative border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-xl shadow-xs dark:shadow-xs">
          <input type="text"
            class="cus-input m-0 w-full resize-none border-0 bg-transparent p-0 pr-10 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:pr-12 pl-3 md:pl-0"
            v-model="newMessage" />
          <button type="submit"
            class="cus-btn absolute p-1 rounded-md md:bottom-3 md:p-2 md:right-3 dark:hover:bg-gray-900 dark:disabled:hover:bg-transparent right-2 disabled:text-gray-400 enabled:bg-brand-purple text-white bottom-1.5 transition-colors disabled:opacity-40">
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
import { socket } from "../../socket.js";

import {
  defineComponent,
  ref,
  onMounted,
} from "vue";
const apiUrl = import.meta.env.VITE_VUE_APP_API_BASE;

export default defineComponent({
  name: "Home",
  setup() {
    const urlParams: any = new URLSearchParams(window.location.search);
    const userId: any = urlParams.get("id");
    const historyContainer: any = ref(null);
    const conversations: any = ref([]);
    const messages: any = ref([]);
    const isCreatedNewChat: any = ref(false);
    const initLoadListConversations = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/chat/conversations`,
          {
            params: {
              userId,
              pageSize: 100,
            },
          }
        );

        conversations.value = response.data.data;
      } catch (error) {
        console.error(error);
      }
    }
    onMounted(async () => {
      //Kết nối socket
      await initLoadListConversations()
    });
    const newChatID: any = ref(null);
    const addNewConversation = async () => {
      messages.value = []
      const response = await axios.post(
        `${apiUrl}/chat/conversations`,
        {
          userId: parseInt(userId),
        }
      );
      if (response.data.message == "Create conversation successful") {
        newChatID.value = response.data.data.id;
        isCreatedNewChat.value = true;

      }
    };
    const checkAndAddNewConversation = async () => {
      if (!isCreatedNewChat.value) {
        await addNewConversation()
      }
    }
    const loadMessages = async (conversationId: number) => {
      newChatID.value = conversationId
      try {
        const response = await axios.get(
          `${apiUrl}/chat/messages`,
          {
            params: {
              userId: userId,
              conversationId: conversationId, // Truyền conversationId vào params
            },
          }
        );
        messages.value = response.data.data.reverse(); // Xử lý dữ liệu trả về từ API
      } catch (error) {
        console.error(error);
      }
    };
    const newMessage = ref("");
    const botMessage = ref("")

    socket.on("chat-rs", async (res: any) => {
      if (res.content !== '[DONE]') {
        botMessage.value += res.content
        if (messages.value[messages.value.length - 1].is_chat_bot) {
          messages.value.pop();
        }
        messages.value.push({
          content: botMessage.value,
          user_id: userId,
          conversation_id: newChatID.value,
          is_chat_bot: true,
        });
      } else {
        botMessage.value = '';
        // await initLoadListConversations();
      }
    });
    const sendMessage = async () => {
      if (newMessage.value.trim()) {
        await checkAndAddNewConversation();
        socket.emit("chat", {
          userId: userId,
          question: newMessage.value.trim(),
          conversationId: newChatID.value,
        });

        messages.value.push({
          content: newMessage.value.trim(),
          user_id: userId,
          conversation_id: newChatID.value,
          fromSocket: false
        });

        newMessage.value = "";


      }
      setTimeout(async () => {
        await initLoadListConversations()
      }, 5000);
    };

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
<style scoped>
.addNewConversation {
  width: 100%;
  padding: 15px;
  background-color: transparent;
  border: 1px solid #fff;
  border-radius: 5px;
  color: #fff;
  text-align: left;
}
</style>